#!/usr/bin/env python3
"""房仲網站 物件自動更新

讀「買賣案件總表.xlsx」→ 重建 script.js 的 listings → 部署 Netlify → 推 GitHub。
總表沒變就直接結束，所以可以放心定時跑。

用法：
  python3 sync_listings.py            # 有變更才更新並發佈
  python3 sync_listings.py --dry-run  # 只顯示會變什麼，不寫檔、不發佈
  python3 sync_listings.py --no-push  # 更新 script.js 但不部署、不推 GitHub
  python3 sync_listings.py --force    # 總表沒變也強制重跑
"""
import datetime
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
XLSX = '/Users/leo/Desktop/1.廣告/買賣案件總表.xlsx'
SCRIPT_JS = os.path.join(SITE, 'script.js')
STATE = os.path.join(HERE, 'state.json')
PHOTO_CACHE = os.path.join(HERE, 'photo_cache.json')
LOG = os.path.join(HERE, 'sync.log')
NETLIFY_SITE = '15b58d8f-8b0f-4d9b-8beb-b0c5c16bc591'
DEPLOY_FILES = ['index.html', 'style.css', 'script.js', 'agent-photo.jpg', 'logo-emblem.mp4',
                'line-qr.png', 'og-image.jpg', 'robots.txt', 'sitemap.xml']
# launchd 的 PATH 很精簡，補上 homebrew
os.environ['PATH'] = '/opt/homebrew/bin:/usr/local/bin:' + os.environ.get('PATH', '')

DRY = '--dry-run' in sys.argv
NO_PUSH = '--no-push' in sys.argv
FORCE = '--force' in sys.argv

PLACEHOLDER = open(os.path.join(HERE, 'placeholder.txt')).read().strip()

SHEETS = {'松-電梯': 'apartment', '松-公寓': 'house', '松-店面': 'office',
          '外區-北市': None, '外區-新北市': None, '外區-其他縣市': None}


def log(msg):
    line = f"[{datetime.datetime.now():%Y-%m-%d %H:%M:%S}] {msg}"
    print(line)
    if not DRY:
        with open(LOG, 'a', encoding='utf-8') as f:
            f.write(line + '\n')


def run(cmd, cwd=SITE, check=True):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    if check and r.returncode != 0:
        raise RuntimeError(f"{' '.join(cmd)} 失敗：{(r.stderr or r.stdout).strip()[-600:]}")
    return r


# ---------- 讀總表 ----------
def load_master():
    import openpyxl
    wb = openpyxl.load_workbook(XLSX, data_only=True)
    rows = []
    for sn, forced in SHEETS.items():
        ws = wb[sn]
        for r in range(3, ws.max_row + 1):
            row = []
            for c in range(1, 16):
                v = ws.cell(row=r, column=c).value
                if isinstance(v, (datetime.date, datetime.datetime)):
                    v = v.isoformat()
                row.append(v)
            if row[3] is None:
                continue
            note = row[14]
            adv = (row[1] == 'O' or row[2] == 'O') and (not note or '不可廣告' not in str(note))
            rows.append({'sheet': sn, 'forced_type': forced, 'title': str(row[3]).strip(),
                         'addr': row[4], 'area': row[5], 'price': row[6], 'layout': row[7],
                         'usage': row[13], 'advertisable': adv})
    return rows


def norm(s):
    s = s.replace('⼭', '山').replace('⺠', '民').replace('⾦', '金').replace('⾯', '面')
    return re.sub(r'[\s_\-（）()【】「」\'"]', '', s)


DISTRICT_CITY = {}
for city, ds in {
    '台北市': '中正 大同 中山 松山 大安 萬華 信義 士林 北投 內湖 南港 文山',
    '新北市': '板橋 三重 中和 永和 新莊 新店 樹林 鶯歌 三峽 淡水 汐止 汐⽌ 瑞芳 土城 蘆洲 五股 泰山 林口 深坑 石碇 坪林 三芝 石門 八里 平溪 雙溪 貢寮 金山 萬里 烏來',
    '桃園市': '桃園 中壢 平鎮 八德 楊梅 蘆竹 大溪 龍潭 龜山 大園 觀音 新屋 復興',
    '新竹市': '東 北 香山',
    '台中市': '中 西 南 北屯 西屯 南屯 太平 大里 霧峰 烏日 豐原',
}.items():
    for d in ds.split():
        DISTRICT_CITY[d + '區'] = city
COUNTIES = ['宜蘭縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '花蓮縣', '台東縣',
            '澎湖縣', '金門縣', '連江縣', '新竹縣', '苗栗縣', '基隆市']


# 總表地址常省略縣市，只寫「壯圍鄉…」這類；用鄉鎮反查縣市
TOWNSHIP_COUNTY = {}
for county, ts in {
    '宜蘭縣': '宜蘭市 頭城鎮 礁溪鄉 壯圍鄉 員山鄉 羅東鎮 三星鄉 大同鄉 五結鄉 冬山鄉 蘇澳鎮 南澳鄉',
}.items():
    for t in ts.split():
        TOWNSHIP_COUNTY[t] = county
# 「北區/東區/西區…」各縣市都有，靠案名關鍵字判斷
AMBIGUOUS_HINT = [('中醫', '台中市'), ('逢甲', '台中市'), ('新竹', '新竹市'), ('竹北', '新竹縣')]
CITY_PREFIX = r'(?:(?:台北|新北|桃園|台中|台南|高雄|新竹|基隆|嘉義)市|\S{2}縣)?'


def clean_addr(addr):
    return unicodedata.normalize('NFKC', str(addr or '')).replace('臺', '台').replace(' ', '')


def parse_district(addr):
    m = re.match(CITY_PREFIX + r'([^\d區鄉鎮市]{1,3}[區鄉鎮市])', clean_addr(addr))
    return m.group(1) if m else ''


def region_of(sheet, addr, title=''):
    if sheet.startswith('松-') or not addr:
        return '台北市'
    a = clean_addr(addr)
    for c in COUNTIES:
        if a.startswith(c):
            return c
    m = re.match(r'^(台北|新北|桃園|台中|台南|高雄|新竹)市', a)
    if m:
        return m.group(0)
    d = parse_district(a)
    if d in TOWNSHIP_COUNTY:
        return TOWNSHIP_COUNTY[d]
    if d in DISTRICT_CITY:
        if d in ('北區', '東區', '西區', '南區', '中區', '香山區'):
            for kw, city in AMBIGUOUS_HINT:
                if kw in (title or ''):
                    return city
        return DISTRICT_CITY[d]
    return {'外區-新北市': '新北市', '外區-北市': '台北市'}.get(sheet, '其他')


def parse_price(p):
    m = re.search(r'([\d.]+)', str(p)) if p is not None else None
    return int(float(m.group(1))) if m else None


def parse_layout(layout):
    if not layout:
        return 0, 0

    def num(x):
        x = x.strip()
        try:
            return sum(float(p) for p in x.split('+')) if '+' in x else float(x)
        except ValueError:
            m = re.search(r'[\d.]+', x)
            return float(m.group()) if m else 0
    parts = str(layout).strip().split('/')
    rooms = num(parts[0])
    baths = num(parts[2]) if len(parts) >= 3 else (num(parts[-1]) if len(parts) >= 2 else 0)
    return (int(rooms) if rooms == int(rooms) else rooms,
            int(baths) if baths == int(baths) else baths)


CN_NUM = {'一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9}


def cn_to_int(t):
    if t == '十':
        return 10
    if t.startswith('十'):
        return 10 + CN_NUM.get(t[1:], 0)
    if '十' in t:
        a, _, b = t.partition('十')
        return CN_NUM.get(a, 0) * 10 + CN_NUM.get(b, 0)
    return CN_NUM.get(t, 0)


def parse_floor(addr, title):
    """從地址抓所在樓層（B1 = -1）；抓不到回傳 None，不亂猜。"""
    a = str(addr or '').translate(str.maketrans('０１２３４５６７８９ＢＦ', '0123456789BF'))
    m = re.search(r'B(\d)\s*$|地下\s*(\d)?', a)
    if m:
        return -int(m.group(1) or m.group(2) or 1)
    m = re.search(r'(\d+)\s*(?:[-~至、,]\s*\d+\s*)?(?:樓|F)', a) or re.search(r'([一二三四五六七八九十]+)樓', a)
    if m:
        g = m.group(1)
        return int(g) if g.isdigit() else cn_to_int(g)
    if re.search(r'(?<![\d一二三四五六七八九十])(1樓|一樓)', str(title)):
        return 1
    return None


def has_parking(title):
    """總表沒有車位欄，只能靠案名判斷「有標示車位」；沒標示不代表沒有。"""
    t = str(title).replace('車路頭', '')
    return 1 if re.search(r'車位|停車|車庫|雙車|平車|含車|附車|頂加車|房車|車$', t) else 0


def extract_schools(title):
    """總表沒有學區欄，只在案名直接寫出「OO國小/國中」時才抓得到（例如「中山國小站」）；
    案名只寫「雙敦學區」「麗山學區」這種地區暱稱、看不出對應哪所學校的，抓不到就不填，
    避免亂猜錯學校。"""
    t = str(title)
    elem = re.search(r'([一-龥]{2})國小', t)
    junior = re.search(r'([一-龥]{2})國中', t)
    return (elem.group(1) + '國小' if elem else ''), (junior.group(1) + '國中' if junior else '')


# ---------- 國小／國中學區（直接查臺北市政府「學區查詢系統」官方 API，目前只做松山區）----------
# 流程跟 https://schooldistrict.tp.edu.tw 網頁一樣：先把地址交給臺北市地理倉儲地址定位
# 查出「里／鄰」，再拿里鄰去查對應學區（國小＋國中一次查到，含大學區共同學區的多所學校）。
# 這兩支都是該網站自己頁面在呼叫的公開 API，用 Referer 帶自己網域即可，不是繞過權限。
# 查過的地址會存進 tools/school_zone_cache.json，之後同一筆地址不用再打（對政府主機客氣一點），
# 只有新地址或地址改了才會重查；查詢失敗（沒網路、逾時）就跳過，不影響其他資料照常發佈。
SCHOOL_ZONE_CACHE = os.path.join(HERE, 'school_zone_cache.json')
SCHOOL_ZONE_SHEETS = ('松-電梯', '松-公寓', '松-店面')  # 目前只針對松山區；之後要擴大縣市在這裡加分頁即可
_GEOCODE_URL = 'https://map-tpgos.gov.taipei/embed/webapi.cfm'
_SCHOOL_URL = 'https://schooldistrict.tp.edu.tw/gis/checkSchoolByVillage.jsp'
_GIS_HEADERS = {'Referer': 'https://schooldistrict.tp.edu.tw/html/search.jsp'}
_GIS_APIKEY = '918A7CB57AE38AD226859ECFEE7811F0CF9BFC00B197C8D0780CF8C3C9BEE820BDAB728ECD6775DA2DF39DCAF26DBB68'


def load_school_zone_cache():
    if os.path.exists(SCHOOL_ZONE_CACHE):
        return json.load(open(SCHOOL_ZONE_CACHE, encoding='utf-8'))
    return {}


def save_school_zone_cache(cache):
    json.dump(cache, open(SCHOOL_ZONE_CACHE, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


def _gis_get(url, params):
    import urllib.request, urllib.parse, ssl
    req = urllib.request.Request(f'{url}?{urllib.parse.urlencode(params)}', headers=_GIS_HEADERS)
    ctx = ssl._create_unverified_context()  # 政府網站的憑證鏈本機驗不過，跟瀏覽器行為一致改用 -k 等級處理
    with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
        return resp.read().decode('utf-8', 'ignore')


def _gis_post(url, data):
    import urllib.request, urllib.parse, ssl
    req = urllib.request.Request(url, data=urllib.parse.urlencode(data).encode(),
                                  headers=_GIS_HEADERS, method='POST')
    ctx = ssl._create_unverified_context()
    with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
        return resp.read().decode('utf-8', 'ignore')


def fetch_school_zone(addr):
    """查一個地址的學區，回傳 {'elem': [...], 'junior': [...]}；查不到/查詢失敗回傳 None。"""
    try:
        text = _gis_get(_GEOCODE_URL, {
            'SERVICE': 'ADDRESS', 'ADDRESS': addr, 'APIKEY': _GIS_APIKEY,
            'ITEM_LIST': 'TPGOS_CA_ADDR:30,TPGOS_PWLMK_ADDR:30,TPGOS_XY_ADDR:30,TGOS_V2_ADDR:30',
            'format': 'JSON', 'DETAIL': 'true'})
        m = re.search(r'\{"WEBSERVICE".*\}\}\}', text)
        if not m:
            return None
        qr = json.loads(m.group(0))['WEBSERVICE']['QUERYRESULT']
        if qr.get('COUNT') in (None, '0'):
            return None
        detail = qr.get('DETAIL') or {}
        zone, village, lin = detail.get('ZONE'), detail.get('LIE'), detail.get('LIN')
        if not (zone and village and lin):
            return None
        neighbor = re.sub(r'\D', '', lin).lstrip('0') or '0'

        text2 = _gis_post(_SCHOOL_URL, {'sectName': zone, 'lieName': village, 'sdfName': f'{village}{neighbor}'})
        m2 = re.search(r'\[.*\]', text2, re.S)
        records = json.loads(m2.group(0)) if m2 else []
    except Exception:
        return None

    elem, junior = [], []
    for rec in records:
        name = rec.get('schoolName', '')
        if name.endswith('國小') and name not in elem:
            elem.append(name)
        elif '國中' in name:
            base = re.sub(r'高中國中部$', '國中', name)  # 附設國中部的完全中學，統一顯示國中部那個名字
            if base not in junior:
                junior.append(base)
    return {'elem': elem, 'junior': junior}


def address_school_zone(addr, sheet, cache):
    """只針對 SCHOOL_ZONE_SHEETS（目前是松山區三個分頁）查學區；優先吃快取，新地址才打 API。"""
    if sheet not in SCHOOL_ZONE_SHEETS:
        return '', ''
    key = unicodedata.normalize('NFKC', str(addr or '')).strip()
    if not key:
        return '', ''
    if key not in cache:
        result = fetch_school_zone(key)
        if result is not None:
            cache[key] = result  # 查詢失敗（逾時、地址查無資料）不寫快取，下次執行會自動重試
    result = cache.get(key)
    if not result:
        return '', ''
    return '、'.join(result['elem']), '、'.join(result['junior'])


def classify(r):
    if r['forced_type']:
        return r['forced_type']
    t, u = r['title'], str(r['usage'] or '')
    if any(k in t for k in ['店面', '金店', '店鋪', '收租店', '辦公', '純辦', '住辦']) or \
       any(k in u for k in ['辦公', '事務所', '零售業', '商業用', '店鋪', '市場']):
        return 'office'
    if any(k in t for k in ['透天', '別墅', '公寓', '農舍']):
        return 'house'
    return 'apartment'


# ---------- script.js 讀寫 ----------
ENTRY_RE = re.compile(
    r"\{ id: (\d+), type: '(\w+)', title: '((?:[^'\\]|\\.)*)', region: '([^']*)', (?:district: '[^']*', )?price: (\d+), "
    r"area: ([\d.]+), rooms: ([\d.]+), baths: ([\d.]+), (?:floor: (?:-?\d+|null), )?(?:parking: [01], )?"
    r"(?:schoolElem: '[^']*', )?(?:schoolJunior: '[^']*', )?badge: '([^']*)', img: '([^']*)', link: '([^']*)' \}")
ARRAY_RE = re.compile(r"(const listings = \[\n)(.*?)(\n  \];)", re.S)


def current_entries(js):
    out = []
    for m in ENTRY_RE.finditer(js):
        out.append({'type': m.group(2), 'title': m.group(3).replace("\\'", "'"),
                    'price': int(m.group(5)), 'area': float(m.group(6)),
                    'img': m.group(10), 'link': m.group(11), 'badge': m.group(9)})
    return out


def js_str(s):
    return s.replace('\\', '\\\\').replace("'", "\\'")


def fmt_num(n):
    return str(int(n)) if float(n) == int(n) else str(n)


def build(master, cache):
    final, missing = [], 0
    used = {}
    zone_cache = load_school_zone_cache()
    for r in master:
        if not r['advertisable']:
            continue
        if any(k in str(r['layout'] or '') for k in ['純土地', '車位']):
            continue
        key = norm(r['title'])
        area = float(r['area']) if r['area'] not in (None, '') else 0
        cands = cache.get(key, [])
        # 同名多筆時，挑坪數最接近、且還沒被用掉的
        cands = [c for i, c in enumerate(cands) if (key, i) not in used]
        photo = min(cands, key=lambda c: abs(c['area'] - area)) if cands else None
        if photo:
            used[(key, cache[key].index(photo))] = 1
        price = parse_price(r['price'])
        if price is None:
            continue
        rooms, baths = parse_layout(r['layout'])
        kw_elem, kw_junior = extract_schools(r['title'])
        addr_elem, addr_junior = address_school_zone(r['addr'], r['sheet'], zone_cache)
        school_elem, school_junior = addr_elem or kw_elem, addr_junior or kw_junior
        e = {'type': photo['type'] if photo else classify(r), 'title': r['title'],
             'region': region_of(r['sheet'], r['addr'], r['title']),
             'district': parse_district(r['addr']), 'price': price, 'area': area,
             'rooms': rooms, 'baths': baths, 'floor': parse_floor(r['addr'], r['title']),
             'parking': has_parking(r['title']), 'schoolElem': school_elem, 'schoolJunior': school_junior}
        if photo:
            e.update(img=photo['img'], link=photo['link'], badge=photo['badge'])
        else:
            e.update(img=PLACEHOLDER, link='', badge='照片準備中')
            missing += 1
        final.append(e)
    final.sort(key=lambda e: (e['price'], e['title']))
    save_school_zone_cache(zone_cache)
    return final, missing


def render(final):
    lines = []
    for i, e in enumerate(final, 1):
        lines.append(
            f"    {{ id: {i}, type: '{e['type']}', title: '{js_str(e['title'])}', region: '{e['region']}', district: '{e['district']}', "
            f"price: {e['price']}, area: {fmt_num(e['area'])}, rooms: {fmt_num(e['rooms'])}, "
            f"baths: {fmt_num(e['baths'])}, floor: {'null' if e['floor'] is None else e['floor']}, parking: {e['parking']}, "
            f"schoolElem: '{e['schoolElem']}', schoolJunior: '{e['schoolJunior']}', badge: '{e['badge']}', img: '{e['img']}', link: '{e['link']}' }},")
    return '\n'.join(lines)


def main():
    if not os.path.exists(XLSX):
        log(f'找不到總表：{XLSX}')
        return 1
    xlsx_hash = hashlib.md5(open(XLSX, 'rb').read()).hexdigest()
    state = json.load(open(STATE)) if os.path.exists(STATE) else {}
    if not FORCE and state.get('xlsx_hash') == xlsx_hash and state.get('published'):
        return 0  # 沒變，安靜結束

    js = open(SCRIPT_JS, encoding='utf-8').read()
    old = current_entries(js)
    if not old:
        log('script.js 讀不到物件，中止')
        return 1

    # 照片快取：以目前網站上有真照片的為底，累積起來（下架再回來也找得回照片）
    cache = json.load(open(PHOTO_CACHE, encoding='utf-8')) if os.path.exists(PHOTO_CACHE) else {}
    for e in old:
        if not e['img'].startswith('data:'):
            lst = cache.setdefault(norm(e['title']), [])
            if not any(c['img'] == e['img'] for c in lst):
                lst.append({k: e[k] for k in ('type', 'area', 'img', 'link', 'badge')})

    try:
        master = load_master()
    except Exception as ex:  # Excel 存檔到一半等情況，下次再來
        log(f'總表讀取失敗，稍後重試：{ex}')
        return 1
    final, missing = build(master, cache)

    # 安全閥：筆數暴增暴減多半是總表格式被動過，不要直接上線
    if len(final) < len(old) * 0.7 or len(final) > len(old) * 1.4:
        log(f'物件數從 {len(old)} 變成 {len(final)}，變動過大，已中止（需人工確認）')
        return 2

    old_keys = {(norm(e['title']), e['price']) for e in old}
    new_keys = {(norm(e['title']), e['price']) for e in final}
    added = [e['title'] for e in final if (norm(e['title']), e['price']) not in old_keys]
    removed = [e['title'] for e in old if (norm(e['title']), e['price']) not in new_keys]
    summary = f'{len(old)} → {len(final)} 筆（新增 {len(added)}、下架/調價 {len(removed)}、待補照片 {missing}）'
    log(summary)
    for t in added[:15]:
        log(f'  + {t}')
    for t in removed[:15]:
        log(f'  - {t}')
    if DRY:
        return 0

    new_js = ARRAY_RE.sub(lambda m: m.group(1) + render(final) + m.group(3), js, count=1)
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f:
        f.write(new_js)
    try:
        run(['node', '--check', f.name])
    finally:
        os.unlink(f.name)

    open(SCRIPT_JS, 'w', encoding='utf-8').write(new_js)
    json.dump(cache, open(PHOTO_CACHE, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    state.update(xlsx_hash=xlsx_hash, published=False, count=len(final))
    json.dump(state, open(STATE, 'w'), indent=1)

    if NO_PUSH:
        log('已更新 script.js（--no-push，未部署）')
        return 0

    # 部署乾淨包（不直接傳整個資料夾，避免雜檔上線）
    pkg = tempfile.mkdtemp(prefix='chunhui-deploy-')
    try:
        for name in DEPLOY_FILES:
            shutil.copy(os.path.join(SITE, name), pkg)
        r = run(['netlify', 'deploy', '--prod', '--dir', pkg, '--site', NETLIFY_SITE,
                 '--message', f'自動同步總表 {summary}'])
        log('Netlify 部署完成')
    finally:
        shutil.rmtree(pkg, ignore_errors=True)

    run(['git', 'add', 'script.js', 'tools/photo_cache.json'])
    if run(['git', 'diff', '--cached', '--quiet'], check=False).returncode != 0:
        run(['git', 'commit', '-m', f'自動同步買賣案件總表：{summary}\n\n'
             'Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>'])
        try:
            run(['git', 'push'])
            log('GitHub 已備份')
        except RuntimeError as ex:
            log(f'GitHub 推送失敗（網站已更新，不影響上線）：{ex}')
    state['published'] = True
    json.dump(state, open(STATE, 'w'), indent=1)
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as ex:
        log(f'發生錯誤：{ex}')
        sys.exit(1)
