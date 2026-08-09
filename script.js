document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Data ---------- */
  const listings = [
    { id: 1, type: 'apartment', title: '敦北南京新屋3房', region: '台北市', price: 6750, area: 47.47, rooms: 3, baths: 2, badge: '新上架', img: 'https://img2.591.com.tw/house/2026/03/23/177424225000429509.png!x.water2.png', link: 'https://www.ibigfun.com/pages/house/0927066512/7fb45291-4559-11f1-b190-0a84bab091bd' },
    { id: 2, type: 'office', title: '敦北南京人潮金店', region: '台北市', price: 4880, area: 25.84, rooms: 0, baths: 1, badge: '店面', img: 'https://cloudfps.hfcdn.com/v1/image/?key=NF58Ko5oaCv74sFiBZGZd5AbCWI7zDFznCsOuZhfAn51mX2UHXzMpzbFeH0PN_ADqVhtUUJ4lA_cF1mBh5MY1RWd5eEaa7mn9qxu8f6s-rtKfVoBsurTgAnsNQ3b1ueVa0jD0JJgeWt02Xc92Hgeax9ptXAdU5ZuvuDE3ieU7m7vt1GEps7FWGRbvllj1fnybJxPB_eh0mibn_xuG2pFwFKIji3F260JoWjl9eB8VSKBd9hk8aZg8MnUezEOQMv6Kl36yV3X2oJPVOMkMUvw-yDjDLIygfYDIO2l_YXPGQr925gg1d9mkG3RFRGXpmVP&width=1024&height=768', link: 'https://www.ibigfun.com/pages/house/0927066512/4fa3f8d9-4559-11f1-b190-0a84bab091bd' },
    { id: 3, type: 'apartment', title: '錦州福邸電梯三房', region: '台北市', price: 3088, area: 27.66, rooms: 3, baths: 2, badge: '', img: 'https://img1.591.com.tw/house/2025/11/28/176431536007796507.jpg!x.water2.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/e489d7b5-ea0c-11f0-ba76-0a84bab091bd' },
    { id: 4, type: 'house', title: '富錦聯合二村一樓（前庭後院）', region: '台北市', price: 7980, area: 36.16, rooms: 0, baths: 1, badge: '稀有釋出', img: 'https://static.rakuya.com.tw/r1/n414/25/b4/32413414_1_b.jpeg?1762529718', link: 'https://www.ibigfun.com/pages/house/0927066512/edd8d945-d755-11f0-81ec-0a84bab091bd' },
    { id: 5, type: 'apartment', title: '敦北捷運大三房', region: '台北市', price: 3688, area: 45.73, rooms: 3, baths: 4, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02546479106379534169ba098d4ee7b.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/258f0093-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 6, type: 'office', title: '六德松菸巨蛋景觀辦公BC戶', region: '台北市', price: 10500, area: 128.98, rooms: 6, baths: 1, badge: '景觀辦公', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254648049317009369772445633c9.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/24ca078b-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 7, type: 'office', title: '六德松菸巨蛋景觀辦公A戶', region: '台北市', price: 5500, area: 67.97, rooms: 1, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025465122013511428697849df9ac55.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/24a48aff-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 8, type: 'house', title: '南京復興捷運美寓', region: '台北市', price: 2750, area: 29.66, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026039169985497806a698898e915a.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/a393f746-8bcd-11f1-b7b8-0a84bab091bd' },
    { id: 9, type: 'apartment', title: '雙敦復興捷運兩房', region: '台北市', price: 2380, area: 21.22, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260391017282597286a69b23903221.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/e86b023b-8ba5-11f1-b7b8-0a84bab091bd' },
    { id: 10, type: 'apartment', title: '中山國小捷運靚麗電梯2房', region: '台北市', price: 1590, area: 19.06, rooms: 2, baths: 1, badge: '首購推薦', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260391313222845416a62d39961672.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/47ec73a2-87b7-11f1-a7b7-0a84bab091bd' },
    { id: 11, type: 'house', title: '捷運展覽館站樸實三房', region: '台北市', price: 2280, area: 32.34, rooms: 3, baths: 1.5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026039056140382986a63103ad30a3.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/47d8ff66-87b7-11f1-a7b7-0a84bab091bd' },
    { id: 12, type: 'apartment', title: '光復南京高坪效電梯美宅', region: '台北市', price: 4688, area: 49.2, rooms: 3, baths: 2.5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA024334633617246306a61827ae3ecb.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/92ca7591-86f0-11f1-a7b7-0a84bab091bd' },
    { id: 13, type: 'apartment', title: '【揚昇君苑】水岸景觀豪邸', region: '台北市', price: 10800, area: 85.52, rooms: 3, baths: 3, badge: '豪宅', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038869029889776a61a85d1b167.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/92adb82d-86f0-11f1-a7b7-0a84bab091bd' },
    { id: 14, type: 'apartment', title: '南京三民捷運三房', region: '台北市', price: 3580, area: 39.57, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003226239769826a61c67746481.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/929c04ee-86f0-11f1-a7b7-0a84bab091bd' },
    { id: 15, type: 'apartment', title: '松山車站101景觀四房', region: '台北市', price: 5500, area: 58.42, rooms: 4, baths: 3, badge: '景觀宅', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260390619706001546a55f552b35f5.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/92897383-86f0-11f1-a7b7-0a84bab091bd' },
    { id: 16, type: 'apartment', title: '稀有怡和翠庭四房露臺戶', region: '台北市', price: 8888, area: 60.26, rooms: 4, baths: 2, badge: '稀有釋出', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038919214133346a3cd04c58619.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/dc2fe1a3-8584-11f1-a7b7-0a84bab091bd' },
    { id: 17, type: 'apartment', title: '信義靜巷電梯二房', region: '台北市', price: 1680, area: 20.31, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025509831341033385690d992380c35.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/ffdb1777-8235-11f1-9700-0a84bab091bd' },
    { id: 18, type: 'office', title: '民生圓環1樓辦公室', region: '台北市', price: 2375, area: 32.5, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038776408164866a571db264f53.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/3a2cae60-80a5-11f1-9700-0a84bab091bd' },
    { id: 19, type: 'house', title: '三重車路頭街全新公寓', region: '新北市', price: 1180, area: 23.9, rooms: 3, baths: 2, badge: '首購推薦', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260033821098868676a3ca4d101d9f.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/d649b717-70f5-11f1-aa85-0a84bab091bd' },
    { id: 20, type: 'house', title: '晴光商圈美妝3房', region: '台北市', price: 1688, area: 16.98, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038976878533746a3a1e11e50a8.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/a3b384ae-6f85-11f1-aa85-0a84bab091bd' },
    { id: 21, type: 'house', title: '吉林錦州面公園2+1房', region: '台北市', price: 1598, area: 13.62, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02545841145777246868944a726d233.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/e8b402b2-6eed-11f1-aa85-0a84bab091bd' },
    { id: 22, type: 'house', title: '敦小介壽低樓層採光好寓所', region: '台北市', price: 3480, area: 31.38, rooms: 3, baths: 1.5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003165493107476a38ecdd9be89.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/b329be3a-6e9f-11f1-aa85-0a84bab091bd' },
    { id: 23, type: 'house', title: '國泰光北1樓可停車三房', region: '台北市', price: 4880, area: 30.39, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038818105984626a2a4d4859333.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/49b701d7-6596-11f1-86b2-0a84bab091bd' },
  ];

  const testimonials = [
    { name: '陳先生', role: '首購族', text: '第一次買房完全沒經驗，經紀人非常有耐心地說明每個流程，最後用理想的價格買到滿意的房子。', avatar: 'https://i.pravatar.cc/80?img=12' },
    { name: '林小姐', role: '換屋族', text: '賣舊屋買新屋一站搞定，估價精準、行銷曝光也很快，短短三週就成交，非常專業！', avatar: 'https://i.pravatar.cc/80?img=32' },
    { name: '王先生', role: '投資客', text: '合作多次的房仲團隊，資訊透明、反應迅速，每次都能談到不錯的價格，值得信賴。', avatar: 'https://i.pravatar.cc/80?img=51' },
  ];

  const typeLabel = { house: '公寓', apartment: '電梯大樓', office: '店面/辦公' };

  /* ---------- Header scroll & mobile nav ---------- */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const backToTop = document.getElementById('back-to-top');

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Hero stat counters ---------- */
  const statTargets = { 'stat-deals': 1280, 'stat-years': 15, 'stat-clients': 960, 'stat-agents': 42 };
  const statEls = Object.keys(statTargets).map(id => document.getElementById(id));

  const animateStats = () => {
    statEls.forEach(el => {
      const target = statTargets[el.id];
      const duration = 1400;
      const start = performance.now();
      const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
    });
  };

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(document.querySelector('.hero-stats'));

  /* ---------- Listings render & filter ---------- */
  const grid = document.getElementById('listing-grid');
  const emptyState = document.getElementById('listing-empty');
  const filterTabs = document.getElementById('filter-tabs');
  const loadMoreBtn = document.getElementById('load-more');

  const favorites = new Set();
  const PAGE_SIZE = 6;
  let currentFilter = 'all';
  let searchQuery = { type: 'all', region: 'all', price: 'all' };
  let visibleCount = PAGE_SIZE;

  const formatPrice = p => p >= 10000 ? `${(p / 10000).toFixed(1)}億` : `${p.toLocaleString()}萬`;

  const regionKey = { '台北市': 'taipei', '新北市': 'newtaipei', '桃園市': 'taoyuan', '台中市': 'taichung' };

  function getFiltered() {
    return listings.filter(item => {
      if (currentFilter !== 'all' && item.type !== currentFilter) return false;
      if (searchQuery.type !== 'all' && item.type !== searchQuery.type) return false;
      if (searchQuery.region !== 'all' && regionKey[item.region] !== searchQuery.region) return false;
      if (searchQuery.price !== 'all') {
        const [min, max] = searchQuery.price.split('-').map(Number);
        if (item.price < min || item.price > max) return false;
      }
      return true;
    });
  }

  function renderListings() {
    const filtered = getFiltered();
    const slice = filtered.slice(0, visibleCount);

    grid.innerHTML = slice.map(item => `
      <a class="listing-card" data-id="${item.id}" ${item.link ? `href="${item.link}" target="_blank" rel="noopener"` : ''}>
        <div class="listing-thumb">
          <img src="${item.img}" alt="${item.title}" loading="lazy" referrerpolicy="no-referrer">
          ${item.badge ? `<span class="listing-badge">${item.badge}</span>` : ''}
          <button class="listing-fav ${favorites.has(item.id) ? 'active' : ''}" data-fav="${item.id}" aria-label="收藏">${favorites.has(item.id) ? '♥' : '♡'}</button>
        </div>
        <div class="listing-body">
          <div class="listing-price">NT$ ${formatPrice(item.price)}</div>
          <h3 class="listing-title">${item.title}</h3>
          <p class="listing-location">📍 ${item.region} · ${typeLabel[item.type]}</p>
          <div class="listing-meta">
            <span>坪數 ${item.area} 坪</span>
            ${item.rooms ? `<span>${item.rooms} 房</span>` : ''}
            <span>${item.baths} 衛</span>
          </div>
        </div>
      </a>
    `).join('');

    emptyState.hidden = filtered.length !== 0;
    loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-flex';
  }

  filterTabs.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    visibleCount = PAGE_SIZE;
    renderListings();
  });

  grid.addEventListener('click', e => {
    const favBtn = e.target.closest('[data-fav]');
    if (!favBtn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = Number(favBtn.dataset.fav);
    if (favorites.has(id)) { favorites.delete(id); favBtn.classList.remove('active'); favBtn.textContent = '♡'; }
    else { favorites.add(id); favBtn.classList.add('active'); favBtn.textContent = '♥'; }
  });

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    renderListings();
  });

  /* ---------- Hero search ---------- */
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchQuery = {
      type: document.getElementById('search-type').value,
      region: document.getElementById('search-region').value,
      price: document.getElementById('search-price').value,
    };
    currentFilter = 'all';
    filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.filter === 'all'));
    visibleCount = PAGE_SIZE;
    renderListings();
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  });

  renderListings();

  /* ---------- Testimonials ---------- */
  const track = document.getElementById('testimonial-track');
  const dotsWrap = document.getElementById('testimonial-dots');

  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <img src="${t.avatar}" alt="${t.name}">
        <div><strong>${t.name}</strong><span>${t.role}</span></div>
      </div>
    </div>
  `).join('');

  dotsWrap.innerHTML = testimonials.map((_, i) => `<button data-i="${i}" class="${i === 0 ? 'active' : ''}"></button>`).join('');

  dotsWrap.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const i = Number(btn.dataset.i);
    const card = track.children[i];
    if (card) track.scrollTo({ left: card.offsetLeft - 8, behavior: 'smooth' });
    dotsWrap.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll('.listing-card, .service-card, .testimonial-card');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const observeReveal = () => {
    document.querySelectorAll('.listing-card, .service-card').forEach(el => {
      if (el.dataset.revealed) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      el.dataset.revealed = 'true';
      revealObserver.observe(el);
    });
  };
  observeReveal();

  const gridObserver = new MutationObserver(observeReveal);
  gridObserver.observe(grid, { childList: true });
});
