document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Data ---------- */
  const listings = [
    { id: 1, type: 'apartment', title: '【專任】松江低總美套房', region: '台北市', price: 750, area: 6.9, rooms: 1, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02462677896807047695c74514c2d4.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/252e7aec-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 2, type: 'house', title: '北投溫泉宜居公寓', region: '台北市', price: 788, area: 23.39, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0243348123500121367ac3bd6757af.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/27decaeb-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 3, type: 'apartment', title: '東湖電梯挑高3米6小資宅', region: '台北市', price: 898, area: 7.7, rooms: 1, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0247941088866367767ff7737d87a8.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/27710bff-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 4, type: 'apartment', title: '玫瑰電梯1+1房', region: '台北市', price: 1000, area: 9.83, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260389917065393506a3df44b28b83.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/4e62bbd0-71bb-11f1-aa85-0a84bab091bd' },
    { id: 5, type: 'apartment', title: '石牌學區美套房', region: '台北市', price: 1028, area: 9.54, rooms: 1, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254649018255060946943a3add4e2c.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/257eec32-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 6, type: 'apartment', title: '青春望族精緻小宅', region: '新北市', price: 1088, area: 10.82, rooms: 2, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02545798204646730468f099efb740c.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/262e440e-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 7, type: 'house', title: '三重車路頭街全新公寓', region: '新北市', price: 1180, area: 23.9, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260033821098868676a3ca4d101d9f.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/d649b717-70f5-11f1-aa85-0a84bab091bd' },
    { id: 8, type: 'apartment', title: '雙捷運國賓精緻幸福高樓美二房', region: '台北市', price: 1288, area: 10.21, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260389313624631806a3a38cb23952.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/a97b0f06-6f5c-11f1-aa85-0a84bab091bd' },
    { id: 9, type: 'house', title: '板橋光復學區邊間三房', region: '新北市', price: 1288, area: 23.89, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02545797197807805169169e7e8932c.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/25f0e0b1-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 10, type: 'house', title: '建成商圈收租屋', region: '新北市', price: 1425, area: 31.67, rooms: 5, baths: 5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02546496180758321769450438aa7f6.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/256d9528-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 11, type: 'house', title: '泰和公園邊間2房', region: '台北市', price: 1500, area: 24.96, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003121562110869cb650bdf11c.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/23b3cd9e-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 12, type: 'apartment', title: '中山國小捷運美2房', region: '台北市', price: 1588, area: 15.65, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254585218698669668a40ea72faa4.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/26b47704-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 13, type: 'office', title: '民生挑高5米小店面', region: '台北市', price: 1598, area: 6.59, rooms: 1, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02600327160544102469d4ad371260d.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/235cdbf9-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 14, type: 'house', title: '吉林錦州面公園2+1房', region: '台北市', price: 1598, area: 13.62, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02545841145777246868944a726d233.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/e8b402b2-6eed-11f1-aa85-0a84bab091bd' },
    { id: 15, type: 'apartment', title: '東方之龍2房首選', region: '新北市', price: 1638, area: 28.43, rooms: 2, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0246268719539323176a33a3354c442.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/774ead6d-6b6d-11f1-995f-0a84bab091bd' },
    { id: 16, type: 'apartment', title: '信義靜巷電梯二房', region: '台北市', price: 1680, area: 20.31, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025509831341033385690d992380c35.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/ffdb1777-8235-11f1-9700-0a84bab091bd' },
    { id: 17, type: 'house', title: '晴光商圈美妝3房', region: '台北市', price: 1688, area: 16.98, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038976878533746a3a1e11e50a8.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/a3b384ae-6f85-11f1-aa85-0a84bab091bd' },
    { id: 18, type: 'house', title: '汐止金龍國小一樓美寓', region: '新北市', price: 1780, area: 31.2, rooms: 3, baths: 1.5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0246269610668083326a718e243278f.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/6cbd0d59-9089-11f1-8158-0a84bab091bd' },
    { id: 19, type: 'apartment', title: '松江精品電梯2房', region: '台北市', price: 1788, area: 20.29, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260389618464794506a3b4ee847b0c.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/f811e0f9-7025-11f1-aa85-0a84bab091bd' },
    { id: 20, type: 'house', title: '捷運低總價三房美寓', region: '台北市', price: 1788, area: 22.32, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025458361286126431689d717002420.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/26c3a3d0-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 21, type: 'house', title: '超激推!!精選永安捷運方正一樓', region: '新北市', price: 1900, area: 27.16, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0247378449222249168c7a66bced12.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/2677eac1-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 22, type: 'house', title: '菁山邸_陽明山低總輕豪宅', region: '台北市', price: 1902, area: 25.52, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02405626136420292566a365e673f35.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/280ba600-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 23, type: 'house', title: '菁山邸_陽明山低總輕豪宅', region: '台北市', price: 1946, area: 25.52, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0240562849151392066a7400e661ea.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/27fe73f5-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 24, type: 'apartment', title: '中山晶華捷運美三房', region: '台北市', price: 1980, area: 23.46, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260387810824060286a1e93de668f1.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/ce9e6c93-5f03-11f1-be8e-0a84bab091bd' },
    { id: 25, type: 'office', title: '三和夜市大面寬金店面', region: '新北市', price: 1988, area: 29.62, rooms: 0, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025458161173699571691548dd1b274.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/25fc5c46-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 26, type: 'apartment', title: '雙敦學區1+1電梯小築', region: '台北市', price: 1999, area: 13.95, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003409999078886a0e70c3a6ae9.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/228f8451-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 27, type: 'house', title: '博愛興雅黃金三樓美寓', region: '台北市', price: 2088, area: 20.47, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02546483208384892969a670d2b83e6.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/244453be-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 28, type: 'house', title: '民生朝南收租屋', region: '台北市', price: 2180, area: 34.22, rooms: 5, baths: 5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254651420702280776979b69674968.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/2497898d-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 29, type: 'apartment', title: '機捷A7【富宇天匯】明亮精裝', region: '桃園市', price: 2250, area: 47.93, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260034520680301186a06abd677e58.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/22c56e92-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 30, type: 'house', title: '富民公園美寓', region: '台北市', price: 2280, area: 23.31, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003258382364966a06b9a62c7d9.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/22aa1849-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 31, type: 'office', title: '雙敦學區低總價純辦', region: '台北市', price: 2298, area: 22.71, rooms: 1, baths: 0, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260387614123446436a17bb76943b7.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/22560518-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 32, type: 'house', title: '菁山邸_陽明山低總輕豪宅', region: '台北市', price: 2326, area: 30.84, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02405629105885061766a735f201748.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/27f005b5-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 33, type: 'office', title: '松江挑高B1住辦', region: '台北市', price: 2358, area: 47.77, rooms: 1, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02600326101499389969d4c0cea90e5.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/23703a04-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 34, type: 'apartment', title: '雙敦復興捷運兩房', region: '台北市', price: 2380, area: 21.22, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260391017282597286a69b23903221.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/e86b023b-8ba5-11f1-b7b8-0a84bab091bd' },
    { id: 35, type: 'house', title: '民權富錦鼎加美寓', region: '台北市', price: 2468, area: 26.93, rooms: 3, baths: 0, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025465066069399426982c3d1b4bb8.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/24638847-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 36, type: 'house', title: '六張犁富陽精緻美三房', region: '台北市', price: 2500, area: 28.65, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260388214713190676a212f1b9d62a.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/9a8530b0-605e-11f1-be8e-0a84bab091bd' },
    { id: 37, type: 'apartment', title: '松山機場捷運景觀3房', region: '台北市', price: 2650, area: 31.04, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02546517147163795169ae545e845ca.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/2412f0f4-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 38, type: 'house', title: '民生稀有面寬一樓可停', region: '台北市', price: 2698, area: 28.94, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0216686635647761463aab14388bf8.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/285df6dc-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 39, type: 'house', title: '瓏山林隱蔽性高美屋', region: '新北市', price: 2710, area: 89.63, rooms: 4, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025464881834712795695770727e5a0.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/253fe62b-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 40, type: 'house', title: '南京復興捷運美寓', region: '台北市', price: 2750, area: 29.66, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026039169985497806a698898e915a.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/a393f746-8bcd-11f1-b7b8-0a84bab091bd' },
    { id: 41, type: 'apartment', title: '捷運菜寮邊間電梯四房', region: '新北市', price: 2788, area: 45.87, rooms: 4, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254649270298528569b24e476f929.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/23f8e141-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 42, type: 'office', title: '忠孝統領賺錢屋', region: '台北市', price: 2800, area: 24.66, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254648993300373369364bf708c0f.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/25b5d104-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 43, type: 'house', title: '麗山學區美妝一樓可停車', region: '台北市', price: 2880, area: 31.56, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02545806173717384769d49426aa08e.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/237e9d36-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 44, type: 'house', title: '小巨蛋邊間介壽學區美寓', region: '台北市', price: 2888, area: 32.88, rooms: 1, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02473788114205720269a94cfa8e317.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/242b9303-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 45, type: 'office', title: '雙敦學區優質純辦', region: '台北市', price: 2907, area: 26.9, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260033566137030869fb02e7e8456.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/22ef73ca-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 46, type: 'house', title: '雙敦稀有二樓美寓', region: '台北市', price: 2988, area: 29.91, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003061498499087697c57029c6ca.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/2481822c-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 47, type: 'house', title: '富民公園二樓美寓', region: '台北市', price: 3075, area: 31.0, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025458645482509146908706bd18a7.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/26a7f5e4-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 48, type: 'house', title: '自立街邊間穩收租金店', region: '新北市', price: 3200, area: 32.54, rooms: 2, baths: 0.5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02545776132524665968c777adbd8e2.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/266d4906-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 49, type: 'apartment', title: '翔譽愛力露臺景觀帝王戶', region: '台北市', price: 3250, area: 31.6, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260030485173254969a93127e18c8.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/241ecf57-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 50, type: 'house', title: '敦小介壽低樓層採光好寓所', region: '台北市', price: 3480, area: 31.38, rooms: 3, baths: 1.5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003165493107476a38ecdd9be89.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/b329be3a-6e9f-11f1-aa85-0a84bab091bd' },
    { id: 51, type: 'office', title: '雙車位新生吉林美辦', region: '台北市', price: 3488, area: 27.89, rooms: 3, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254578584604376368cba07a0a0bb.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/2657abd7-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 52, type: 'apartment', title: '南京光復高樓景觀屋', region: '台北市', price: 3488, area: 38.66, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003338352804146a02a0aaf17bc.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/22d56a1c-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 53, type: 'apartment', title: '南京三民捷運三房', region: '台北市', price: 3580, area: 39.57, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003226239769826a61c67746481.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/929c04ee-86f0-11f1-a7b7-0a84bab091bd' },
    { id: 54, type: 'office', title: '南京三民電梯大廈', region: '台北市', price: 3598, area: 40.13, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025465071631312671697af0f5da933.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/2472f635-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 55, type: 'apartment', title: '雙子星問鼎匯挑高景觀兩房', region: '台北市', price: 3650, area: 26.31, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02545835259965267689061ecdb67c.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/26e8e5f2-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 56, type: 'apartment', title: '敦北捷運大三房', region: '台北市', price: 3688, area: 45.73, rooms: 3, baths: 4, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02546479106379534169ba098d4ee7b.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/258f0093-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 57, type: 'office', title: '中山百合居大廈住辦', region: '台北市', price: 3800, area: 51.63, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003111435888426699d166c4a0a2.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/2452f369-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 58, type: 'office', title: '南京復興辦公附車位', region: '台北市', price: 3980, area: 45.49, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260031791295766769b3c50bd4e7e.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/23e4a8d6-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 59, type: 'apartment', title: '南京三民捷運電梯頂加車位', region: '台北市', price: 3998, area: 34.66, rooms: 2, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260033296691803167b2b18901842.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/231d154f-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 60, type: 'apartment', title: '光南名仕園電梯四房大陽台', region: '台北市', price: 4180, area: 47.4, rooms: 4, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02546484786585600692404d736bc9.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/25e09c8d-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 61, type: 'apartment', title: '南京首都捷運宅邊間三房', region: '台北市', price: 4218, area: 42.53, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0255099514889269736a72a2be4c08f.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/cffbd5c4-9127-11f1-8158-0a84bab091bd' },
    { id: 62, type: 'office', title: '正林森北超旺小金店', region: '台北市', price: 4500, area: 14.7, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025465248629303626a4ca36210571.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/9a070934-7a85-11f1-856f-0a84bab091bd' },
    { id: 63, type: 'apartment', title: '捷運綠蔭大三房坡平車', region: '台北市', price: 4580, area: 53.63, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254650820800780966969d289ab08d.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/98074320-9385-11f1-92cf-0a84bab091bd' },
    { id: 64, type: 'office', title: '寶清街金店面', region: '台北市', price: 4598, area: 29.46, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254648688692817269e5e0c7bf619.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/234f4979-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 65, type: 'apartment', title: '光復南京高坪效電梯美宅', region: '台北市', price: 4688, area: 49.2, rooms: 3, baths: 2.5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA024334633617246306a61827ae3ecb.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/92ca7591-86f0-11f1-a7b7-0a84bab091bd' },
    { id: 66, type: 'house', title: '北投國泰邊間透天庭院車庫', region: '台北市', price: 4850, area: 47.8, rooms: 5, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02358597191674475065d6b0d66c717.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/284bba63-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 67, type: 'house', title: '國泰光北1樓可停車三房', region: '台北市', price: 4880, area: 30.39, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038818105984626a2a4d4859333.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/49b701d7-6596-11f1-86b2-0a84bab091bd' },
    { id: 68, type: 'apartment', title: '南京三民邊間大戶', region: '台北市', price: 5288, area: 47.92, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026003467118951406a5741c278874.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/3a19b351-80a5-11f1-9700-0a84bab091bd' },
    { id: 69, type: 'apartment', title: '四季芳庭⾯樹海電梯3房', region: '台北市', price: 5355, area: 59.5, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02603918922397796a7037f629ecd.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/d215dd18-8f80-11f1-8158-0a84bab091bd' },
    { id: 70, type: 'apartment', title: '文普國際雙捷運低公設大戶', region: '台北市', price: 5498, area: 50.14, rooms: 4, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0247375674621641466ed278071185.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/27807302-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 71, type: 'office', title: '六德松菸巨蛋景觀辦公A戶', region: '台北市', price: 5500, area: 67.97, rooms: 1, baths: 0, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025465122013511428697849df9ac55.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/24a48aff-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 72, type: 'office', title: '邊間方正大面寬＊健安金店面', region: '台北市', price: 5840, area: 43.79, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260388914319212866a44d53b63ff7.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/81a2f25d-75cf-11f1-b4a3-0a84bab091bd' },
    { id: 73, type: 'office', title: '東區統領高樓邊間辦公', region: '台北市', price: 6530, area: 59.1, rooms: 0, baths: 0, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0241171012425446966618e6aba24ec.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/282ef780-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 74, type: 'house', title: '南京三⺠商圈優質⾦店⾯', region: '台北市', price: 6680, area: 55.06, rooms: 8, baths: 5, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260390415372751706a45d2bd3a4bf.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/a0f82f19-78f4-11f1-856f-0a84bab091bd' },
    { id: 75, type: 'apartment', title: '碧潭首排_國賓大苑_鋼骨制震', region: '新北市', price: 6880, area: 148.77, rooms: 3, baths: 3, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260034118774106176a20eeedec996.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/85ccab7e-6015-11f1-be8e-0a84bab091bd' },
    { id: 76, type: 'apartment', title: '海華精裝豪邸', region: '台北市', price: 6888, area: 74.5, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0246269780392625693fd80fcc5dc.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/254fdb3c-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 77, type: 'apartment', title: '南京三民絕美電梯3房空中花園', region: '台北市', price: 6950, area: 55.88, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02600334160303562367ada4358639f.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/230a555e-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 78, type: 'office', title: '台大面寬金鑽店面', region: '台北市', price: 6980, area: 69.12, rooms: 0, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02473780537109095681870e95e399.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/27617bbe-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 79, type: 'apartment', title: '太子敦園雙車豪邸', region: '台北市', price: 7100, area: 78.92, rooms: 3, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02479405141075051067f49fbf11ead.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/278e79a6-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 80, type: 'house', title: '台視後雙敦學區面寬車庫一樓', region: '台北市', price: 7900, area: 83.7, rooms: 5, baths: 4, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA02546522213091644568a589ad8f211.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/238a4dd6-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 81, type: 'office', title: '南京三民金店', region: '台北市', price: 9588, area: 47.96, rooms: 0, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0241172214645536586721f83360f42.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/58052b29-973f-11ef-8983-0a84bab091bd' },
    { id: 82, type: 'apartment', title: '力麒敦品天際豪景樓中樓', region: '台北市', price: 9988, area: 154.89, rooms: 6, baths: 3, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0260387913711495046a277e61e4979.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/6fe34704-63dd-11f1-86b2-0a84bab091bd' },
    { id: 83, type: 'house', title: '安和路通安街口透天厝', region: '台北市', price: 9999, area: 19.69, rooms: 1, baths: 1, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA025285341032160653688072a10f71f.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/26fc953c-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 84, type: 'office', title: '六德松菸巨蛋景觀辦公BC戶', region: '台北市', price: 10500, area: 128.98, rooms: 6, baths: 0, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0254648049317009369772445633c9.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/24ca078b-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 85, type: 'apartment', title: '【揚昇君苑】水岸景觀豪邸', region: '台北市', price: 10800, area: 85.52, rooms: 3, baths: 3, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA026038869029889776a61a85d1b167.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/92adb82d-86f0-11f1-a7b7-0a84bab091bd' },
    { id: 86, type: 'apartment', title: '大直長虹PARK豪邸', region: '台北市', price: 10888, area: 101.45, rooms: 4, baths: 2, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA0252854765101546768760b60aa1b5.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/27200df6-5d5a-11f1-be8e-0a84bab091bd' },
    { id: 87, type: 'apartment', title: '華固名鑄樓中樓+車位', region: '台北市', price: 60000, area: 197.07, rooms: 0, baths: 0, badge: '', img: 'https://img.twhg.com.tw/admin/images/OB01/TAC9/TA021791721282888616624d244599686.jpg', link: 'https://www.ibigfun.com/pages/house/0927066512/286c6542-5d5a-11f1-be8e-0a84bab091bd' },
  ];

  const testimonials = [
    { name: '陳先生', role: '首購族', text: '第一次買房完全沒經驗，經紀人非常有耐心地說明每個流程，最後用理想的價格買到滿意的房子。', avatar: 'https://ui-avatars.com/api/?name=陳&size=160&background=e8622c&color=fff&bold=true&font-size=0.5' },
    { name: '林小姐', role: '換屋族', text: '賣舊屋買新屋一站搞定，估價精準、行銷曝光也很快，短短三週就成交，非常專業！', avatar: 'https://ui-avatars.com/api/?name=林&size=160&background=c94f1f&color=fff&bold=true&font-size=0.5' },
    { name: '王先生', role: '投資客', text: '合作多次的房仲團隊，資訊透明、反應迅速，每次都能談到不錯的價格，值得信賴。', avatar: 'https://ui-avatars.com/api/?name=王&size=160&background=1a1a1a&color=fff&bold=true&font-size=0.5' },
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
  const pagination = document.getElementById('pagination');

  const favorites = new Set();
  const PAGE_SIZE = 6;
  let currentFilter = 'all';
  let searchQuery = { type: 'all', region: 'all', price: 'all' };
  let currentPage = 1;

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

  function renderPagination(totalItems) {
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;

    let html = `<button class="page-arrow" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''} aria-label="上一頁">‹</button>`;
    for (let p = 1; p <= totalPages; p++) {
      html += `<button class="page-num ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }
    html += `<button class="page-arrow" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''} aria-label="下一頁">›</button>`;

    pagination.innerHTML = html;
    pagination.style.display = totalPages <= 1 ? 'none' : 'flex';
  }

  function renderListings() {
    const filtered = getFiltered();
    const start = (currentPage - 1) * PAGE_SIZE;
    const slice = filtered.slice(start, start + PAGE_SIZE);

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
    renderPagination(filtered.length);
  }

  filterTabs.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    currentPage = 1;
    renderListings();
  });

  pagination.addEventListener('click', e => {
    const btn = e.target.closest('[data-page]');
    if (!btn || btn.disabled) return;
    const page = Number(btn.dataset.page);
    if (!page || page === currentPage) return;
    currentPage = page;
    renderListings();
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
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
    currentPage = 1;
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
