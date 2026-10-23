// 使用 importmap 後，可以直接用裸名稱
        // 不用importmap無法正常運行
        import { createApp, computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
        import { createRouter, createWebHashHistory } from 'vue-router';

        const toTraditionalChinese = globalThis.OpenCC.Converter({ from: 'cn', to: 'tw' });

        // ── 首頁元件 ──
        const Home = {
            setup() {
                onMounted(() => document.body.classList.add('home-background'));
                onBeforeUnmount(() => document.body.classList.remove('home-background'));
            },
            template: `
                <main class="container py-5 home-page">
                    <header class="text-center mb-5">
                        <h1 class="display-5 fw-bold mb-1">探索精彩內容</h1>
                        <p class="lead text-center mb-0">選擇主題，前往專屬資訊頁面。</p>
                    </header>
                    <section class="row g-4" aria-label="網站內頁">
                        <div class="col-md-4">
                            <router-link to="/movies" class="card h-100 border-0 shadow-sm text-decoration-none text-dark">
                                <div class="card-body text-center p-4">
                                    <div class="display-4 mb-3" aria-hidden="true">🎬</div>
                                    <h2 class="h4 fw-bold">世界電影表</h2>
                                    <p class="text-muted mb-0">依維基百科資料瀏覽各年份電影作品。</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-md-4">
                            <router-link to="/supercars" class="card h-100 border-0 shadow-sm text-decoration-none text-dark">
                                <div class="card-body text-center p-4">
                                    <div class="display-4 mb-3" aria-hidden="true">🏎️</div>
                                    <h2 class="h4 fw-bold">超跑資訊</h2>
                                    <p class="text-muted mb-0">認識經典超跑與代表性能。</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-md-4">
                            <router-link to="/world-cup" class="card h-100 border-0 shadow-sm text-decoration-none text-dark">
                                <div class="card-body text-center p-4">
                                    <div class="display-4 mb-3" aria-hidden="true">⚽</div>
                                    <h2 class="h4 fw-bold">世足資訊</h2>
                                    <p class="text-muted mb-0">查看 2026 世界盃分組與球星。</p>
                                </div>
                            </router-link>
                        </div>
                        <div class="col-md-4">
                            <router-link to="/brands" class="card h-100 border-0 shadow-sm text-decoration-none text-dark">
                                <div class="card-body text-center p-4">
                                    <div class="display-4 mb-3" aria-hidden="true">👗</div>
                                    <h2 class="h4 fw-bold">品牌資訊</h2>
                                    <p class="text-muted mb-0">認識全球服飾與時尚品牌。</p>
                                </div>
                            </router-link>
                        </div>
                    </section>
                </main>
            `
        };

        // ── 品牌資訊元件 ──
        const Brands = {
            setup() {
                const brands = [
                    { rank: 1, name: 'Louis Vuitton', localName: '路易威登', country: '法國', category: '精品時尚', intro: '以旅行箱包、皮件與時裝聞名的法國精品品牌。' },
                    { rank: 2, name: 'Nike', localName: '耐吉', country: '美國', category: '運動服飾', intro: '以運動鞋、運動服與運動文化代表性設計著稱。' },
                    { rank: 3, name: 'Chanel', localName: '香奈兒', country: '法國', category: '精品時尚', intro: '涵蓋高級時裝、皮件、香水與美妝的法國時尚品牌。' },
                    { rank: 4, name: 'Hermès', localName: '愛馬仕', country: '法國', category: '精品時尚', intro: '以皮革工藝、絲巾、配件與馬術傳統聞名。' },
                    { rank: 5, name: 'Zara', localName: 'Zara', country: '西班牙', category: '時裝零售', intro: '提供緊貼流行趨勢的服裝與配件，採快速更新的零售模式。' },
                    { rank: 6, name: 'Gucci', localName: '古馳', country: '義大利', category: '精品時尚', intro: '以義大利工藝、皮件、成衣及鮮明識別設計受到關注。' },
                    { rank: 7, name: 'Dior', localName: '迪奧', country: '法國', category: '精品時尚', intro: '法國時裝屋，產品涵蓋高級訂製服、成衣、皮件與美妝。' },
                    { rank: 8, name: 'Adidas', localName: '愛迪達', country: '德國', category: '運動服飾', intro: '德國運動品牌，產品包括運動鞋、服裝及各類運動裝備。' },
                    { rank: 9, name: 'Rolex', localName: '勞力士', country: '瑞士', category: '腕錶配件', intro: '瑞士腕錶品牌，以經典錶款與精密製錶傳統聞名。' },
                    { rank: 10, name: 'Cartier', localName: '卡地亞', country: '法國', category: '珠寶配件', intro: '法國精品品牌，作品涵蓋珠寶、腕錶與皮件配飾。' },
                    { rank: 11, name: 'UNIQLO', localName: '優衣庫', country: '日本', category: '日常服飾', intro: '以簡約、實穿的日常服裝與機能布料系列為特色。' },
                    { rank: 12, name: 'H&M', localName: 'H&M', country: '瑞典', category: '時裝零售', intro: '瑞典服裝零售品牌，提供服飾、配件與多元風格系列。' },
                    { rank: 13, name: 'Tiffany & Co.', localName: '蒂芙尼', country: '美國', category: '珠寶配件', intro: '美國珠寶品牌，以珠寶設計、訂婚戒指與標誌性藍盒著稱。' },
                    { rank: 14, name: 'Lululemon', localName: '露露樂蒙', country: '加拿大', category: '運動服飾', intro: '以瑜伽、訓練及日常穿著的機能運動服飾為主。' },
                    { rank: 15, name: 'Prada', localName: '普拉達', country: '義大利', category: '精品時尚', intro: '義大利時尚品牌，設計領域包括成衣、皮件、鞋履與配件。' },
                    { rank: 16, name: 'Ray-Ban', localName: '雷朋', country: '義大利', category: '眼鏡配件', intro: '以經典太陽眼鏡與光學眼鏡款式廣為人知。' },
                    { rank: 17, name: 'Puma', localName: '彪馬', country: '德國', category: '運動服飾', intro: '德國運動品牌，產品橫跨運動鞋、服裝與訓練裝備。' },
                    { rank: 18, name: 'Chow Tai Fook', localName: '周大福', country: '中國香港', category: '珠寶配件', intro: '珠寶零售品牌，提供黃金、鑽石與珠寶首飾。' },
                    { rank: 19, name: 'Armani', localName: '阿瑪尼', country: '義大利', category: '精品時尚', intro: '義大利時尚品牌體系，涵蓋服裝、配件與生活風格產品。' },
                    { rank: 20, name: 'Ralph Lauren', localName: '拉夫勞倫', country: '美國', category: '美式時尚', intro: '以美式經典休閒風格為核心，推出服飾、配件與家居系列。' },
                    { rank: 21, name: 'Burberry', localName: '博柏利', country: '英國', category: '精品時尚', intro: '英國時裝品牌，以格紋元素、外套與英倫風格設計聞名。' },
                    { rank: 22, name: 'Yves Saint Laurent', localName: '聖羅蘭', country: '法國', category: '精品時尚', intro: '法國時尚品牌，產品包括成衣、皮件、鞋履與配件。' },
                    { rank: 23, name: 'COACH', localName: '蔻馳', country: '美國', category: '皮件配件', intro: '美國品牌，以手袋、皮件、鞋履與生活配件為主。' },
                    { rank: 24, name: "Victoria's Secret", localName: '維多利亞的秘密', country: '美國', category: '內衣服飾', intro: '以內衣、睡衣、美容產品與相關服飾系列為主。' },
                    { rank: 25, name: 'Givenchy', localName: '紀梵希', country: '法國', category: '精品時尚', intro: '法國時尚品牌，涵蓋高級時裝、成衣、皮件與香氛。' },
                    { rank: 26, name: 'Omega', localName: '歐米茄', country: '瑞士', category: '腕錶配件', intro: '瑞士製錶品牌，以海馬、超霸等腕錶系列受到關注。' },
                    { rank: 27, name: 'Under Armour', localName: '安德瑪', country: '美國', category: '運動服飾', intro: '美國運動品牌，主打訓練服飾、鞋款與運動裝備。' },
                    { rank: 28, name: 'Moncler', localName: '盟可睞', country: '義大利', category: '戶外精品', intro: '以羽絨外套起家，結合戶外機能與精品時尚設計。' },
                    { rank: 29, name: 'Anta', localName: '安踏', country: '中國', category: '運動服飾', intro: '中國運動用品品牌，產品涵蓋運動鞋、服裝及裝備。' },
                    { rank: 30, name: 'The North Face', localName: '北面', country: '美國', category: '戶外服飾', intro: '戶外品牌，提供登山、露營及日常使用的服飾與裝備。' },
                    { rank: 31, name: 'Fila', localName: '斐樂', country: '韓國', category: '運動休閒', intro: '運動與休閒服飾品牌，融合運動傳統與日常穿搭風格。' },
                    { rank: 32, name: 'Celine', localName: '思琳', country: '法國', category: '精品時尚', intro: '法國精品品牌，產品包括成衣、皮件、鞋履及配件。' },
                    { rank: 33, name: 'Skechers', localName: '斯凱奇', country: '美國', category: '鞋履服飾', intro: '美國鞋履品牌，提供休閒鞋、運動鞋與相關服飾。' },
                    { rank: 34, name: "Levi's", localName: '李維斯', country: '美國', category: '丹寧服飾', intro: '以牛仔褲與丹寧服飾傳統聞名的美國品牌。' },
                    { rank: 35, name: 'TAG Heuer', localName: '泰格豪雅', country: '瑞士', category: '腕錶配件', intro: '瑞士腕錶品牌，設計與賽車計時傳統緊密相連。' },
                    { rank: 36, name: 'Tommy Hilfiger', localName: '湯美費格', country: '美國', category: '美式時尚', intro: '美國時尚品牌，以休閒服飾與美式經典風格為主。' },
                    { rank: 37, name: 'New Balance', localName: '新百倫', country: '美國', category: '運動服飾', intro: '運動品牌，以跑鞋、運動服飾及日常休閒鞋款聞名。' },
                    { rank: 38, name: 'Loewe', localName: '羅意威', country: '西班牙', category: '精品時尚', intro: '西班牙精品品牌，以皮革工藝、手袋及創意時裝設計著稱。' },
                    { rank: 39, name: 'Calvin Klein', localName: '卡爾文・克萊恩', country: '美國', category: '美式時尚', intro: '美國時尚品牌，涵蓋成衣、牛仔服飾、內衣與香氛。' },
                    { rank: 40, name: 'Old Navy', localName: 'Old Navy', country: '美國', category: '日常服飾', intro: '以家庭日常穿著、休閒服裝與親民風格為主的服飾品牌。' },
                    { rank: 41, name: 'Bulgari', localName: '寶格麗', country: '義大利', category: '珠寶配件', intro: '義大利精品品牌，作品包括珠寶、腕錶、配件與香氛。' },
                    { rank: 42, name: 'Van Cleef & Arpels', localName: '梵克雅寶', country: '法國', category: '珠寶配件', intro: '法國珠寶與腕錶品牌，以高級珠寶工藝及自然靈感設計聞名。' },
                    { rank: 43, name: 'Lao Feng Xiang', localName: '老鳳祥', country: '中國', category: '珠寶配件', intro: '中國珠寶品牌，產品以黃金首飾、珠寶與工藝設計為主。' },
                    { rank: 44, name: 'Pandora', localName: '潘多拉', country: '丹麥', category: '珠寶配件', intro: '丹麥珠寶品牌，以串飾、手鍊及可搭配的首飾系列著稱。' },
                    { rank: 45, name: 'Bottega Veneta', localName: '葆蝶家', country: '義大利', category: '精品時尚', intro: '義大利精品品牌，以皮革工藝、編織技法及低調設計聞名。' },
                    { rank: 46, name: 'Bosideng', localName: '波司登', country: '中國', category: '羽絨服飾', intro: '中國服飾品牌，以羽絨服及冬季服裝產品為核心。' },
                    { rank: 47, name: 'NEXT', localName: 'NEXT', country: '英國', category: '時裝零售', intro: '英國服飾零售品牌，提供成人與兒童服裝及生活用品。' },
                    { rank: 48, name: "Primark / Penney's", localName: 'Primark / Penney’s', country: '愛爾蘭', category: '時裝零售', intro: '愛爾蘭服飾零售品牌，以服裝、配件及居家用品為主。' },
                    { rank: 49, name: 'BOSS', localName: '博斯', country: '德國', category: '精品時尚', intro: '德國時尚品牌，提供商務服裝、休閒成衣與配件。' },
                    { rank: 50, name: 'Dolce & Gabbana', localName: '杜嘉班納', country: '義大利', category: '精品時尚', intro: '義大利時裝品牌，以鮮明風格的成衣、皮件與配件設計著稱。' }
                ];

                return { brands };
            },
            template: `
                <main class="container py-5">
                    <header class="mb-4">
                        <p class="text-uppercase text-primary fw-bold mb-2">全球服飾品牌</p>
                        <h1 class="display-5 fw-bold mb-1">品牌資訊</h1>
                        <p class="lead text-muted mb-0">從精品時尚、運動服飾到珠寶腕錶，認識 2024 全球服飾品牌價值榜中的 50 個品牌。</p>
                    </header>
                    <section aria-labelledby="brand-list-title">
                        <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
                            <div>
                                <h2 id="brand-list-title" class="h3 fw-bold mb-1">品牌簡介</h2>
                                <p class="text-muted mb-0">排名依來源所列；簡介為品牌類別與特色摘要。</p>
                            </div>
                            <span class="badge text-bg-dark fs-6">{{ brands.length }} 個品牌</span>
                        </div>
                        <div class="row g-3">
                            <div v-for="brand in brands" :key="brand.rank" class="col-md-6 col-xl-4">
                                <article class="card h-100 border-0 shadow-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                                            <div>
                                                <p class="small text-muted mb-1">{{ brand.localName }} · {{ brand.country }}</p>
                                                <h3 class="h5 fw-bold mb-0">{{ brand.name }}</h3>
                                            </div>
                                            <span class="badge text-bg-primary">#{{ brand.rank }}</span>
                                        </div>
                                        <span class="badge text-bg-light border text-secondary mb-2">{{ brand.category }}</span>
                                        <p class="text-secondary small mb-0">{{ brand.intro }}</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                    <aside class="small text-muted border-top pt-3 mt-4">
                        排名與品牌來源：
                        <a href="https://resource.emagecompany.com/big5/famous/2024apparel50.html"
                            target="_blank" rel="noopener noreferrer">2024全球服飾品牌價值50強</a>。
                        品牌簡介為本頁自行撰寫的概括介紹，品牌名稱與商標屬各自權利人所有。
                    </aside>
                </main>
            `
        };

        // ── 超跑資訊元件 ──
        const About = {
            setup() {
                const cars = [
                    { name: 'McLaren F1', detail: '6.1L 自然進氣 V12，碳纖維底盤，最高速約 386 km/h。' },
                    { name: 'Saleen S7', detail: '7.0L V8 自然進氣引擎，約 550 hp，車重約 1,247 kg。' },
                    { name: 'Ferrari Enzo', detail: '限量 399 輛，以創辦人之名命名，並由 F1 技術經驗參與開發。' },
                    { name: 'Porsche Carrera GT', detail: '乾式油底殼 V10 與六速手排配置，輸出約 612 PS，極速逾 330 km/h。' },
                    { name: 'Mercedes-Benz SLR McLaren', detail: 'Mercedes-Benz 與 McLaren 合作打造的稀有高性能車款。' },
                    { name: 'Ford GT', detail: '以空力設計與 3.5L 雙渦輪 V6 為特色，輸出超過 600 ps。' },
                    { name: 'Maserati MC12', detail: '限量 50 輛，搭載源自 Ferrari Enzo 的 V12 引擎，約 620 hp。' },
                    { name: 'Koenigsegg CCX', detail: '4.7L 機械增壓 V8，最大輸出約 806 hp。' },
                    { name: 'Lamborghini Reventón', detail: '戰鬥機風格設計，V12 引擎約 650 hp，限量車款。' },
                    { name: 'Aston Martin One-77', detail: '全球限量 77 輛，7.3L 自然進氣 V12，約 700 hp。' },
                    { name: 'Bugatti Veyron Super Sport', detail: '8.0L 四渦輪 W16，約 1,200 hp，曾創下量產車極速紀錄。' },
                    { name: 'Ferrari LaFerrari', detail: '限量 500 輛的油電混合超跑，綜效輸出約 963 hp。' },
                    { name: 'McLaren P1', detail: '限量 375 輛，結合雙渦輪 V8 與油電系統，約 916 hp。' },
                    { name: 'Porsche 918 Spyder', detail: 'V8 搭配雙電動馬達，綜效輸出約 887 hp。' },
                    { name: 'Bugatti Chiron', detail: '8.0L 四渦輪 W16，最大輸出約 1,500 hp。' },
                    { name: 'Koenigsegg Regera', detail: 'V8 與三具電動馬達組成油電動力，綜效輸出逾 1,500 hp。' },
                    { name: 'Lamborghini Huracán Performante', detail: '5.2L 自然進氣 V10，約 640 hp，車體採用輕量化複合材料。' },
                    { name: 'Pagani Huayra Roadster', detail: '搭載 Mercedes-AMG 6.0L 雙渦輪 V12，約 738 hp。' },
                    { name: 'McLaren 720S', detail: '4.0L 雙渦輪 V8，約 720 hp，0–100 km/h 約 2.9 秒。' },
                    { name: 'RUF CTR 30th Anniversary Edition', detail: '全碳纖維車體與雙渦輪六缸引擎，約 700 hp，極速約 362 km/h。' },
                    { name: 'Bentley Continental Supersports', detail: '四座豪華 GT，6.0L 雙渦輪 W12，約 710 ps。' },
                    { name: 'Lamborghini Aventador SVJ', detail: 'V12 引擎約 770 hp，0–100 km/h 約 2.8 秒。' },
                    { name: 'SSC Tuatara', detail: '以低風阻車身為設計重點，V8 雙渦輪引擎約 1,350 hp。' },
                    { name: 'Aston Martin Valkyrie', detail: 'Aston Martin 與 Red Bull Advanced Technologies 合作開發，V12 約 1,160 hp。' },
                    { name: 'Ferrari SF90 Stradale', detail: 'Ferrari 首款插電式混合動力車型，V8 與三具電動馬達綜效約 1,000 cv。' }
                ];

                return { cars };
            },
            template: `
                <main class="container py-5">
                    <header class="mb-5">
                        <p class="text-uppercase text-primary fw-bold mb-2">經典超級跑車</p>
                        <h1 class="display-4 fw-bold mb-1">超跑資訊</h1>
                        <p class="lead text-muted mb-4">從自然進氣 V12 到油電混合動力，認識 25 部以速度、工程與設計寫下代表作的超級跑車。</p>
                        <div class="card border-0 shadow overflow-hidden">
                            <img
                                class="supercar-cover w-100"
                                src="./img/supercar-cover.jpg"
                                alt="停放在道路上的跑車"
                                fetchpriority="high">
                            <div class="card-body bg-dark text-white p-4 p-md-5">
                                <h2 class="h3 fw-bold">速度之外，還有工程與工藝</h2>
                                <p class="mb-0 text-white-50">這些車款以限量生產、賽道技術、輕量化材料與創新動力，展現不同世代對極致性能的想像。</p>
                            </div>
                        </div>
                    </header>

                    <section aria-labelledby="supercar-list-title">
                        <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
                            <div>
                                <h2 id="supercar-list-title" class="h3 fw-bold mb-1">25 部經典超跑</h2>
                                <p class="text-muted mb-0">以下規格為來源文章整理，依車款版本與測試條件可能有所差異。</p>
                            </div>
                            <span class="badge text-bg-dark fs-6">{{ cars.length }} 款車</span>
                        </div>
                        <div class="row g-3">
                            <div v-for="(car, index) in cars" :key="car.name" class="col-md-6 col-lg-4">
                                <article class="card supercar-card h-100 border-0 shadow-sm">
                                    <div class="card-body p-4">
                                        <div class="d-flex align-items-center gap-3 mb-3">
                                            <span class="badge rounded-pill text-bg-primary">{{ String(index + 1).padStart(2, '0') }}</span>
                                            <h3 class="h5 fw-bold mb-0">{{ car.name }}</h3>
                                        </div>
                                        <p class="text-secondary mb-0">{{ car.detail }}</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>

                    <aside class="mt-5 pt-4 border-top">
                        <p class="small text-muted mb-1">內容依據 LuxuryWatcher 文章資訊重新整理與摘要；車輛照片為示意素材，非來源文章圖片。</p>
                        <a href="https://www.luxurywatcher.com/zh-Hant/article/27882" target="_blank" rel="noopener noreferrer">
                            閱讀原始文章：21 世紀以來的經典超跑名車
                        </a>
                    </aside>
                </main>
            `
        };

        // ── 世界電影作品元件──
        const Counter = {
            setup() {
                const currentYear = new Date().getFullYear();
                const years = computed(() => Array.from(
                    { length: currentYear - 1900 + 1 },
                    (_, index) => currentYear - index
                ));
                const selectedYear = ref(currentYear);
                const yearDropdownOpen = ref(false);
                const yearDropdownRef = ref(null);
                const moviePlaceholder = './img/movie-placeholder.svg';
                const yearData = ref({
                    [currentYear]: {
                        movies: [], loading: false, loadError: '', scannedCategories: 0, loaded: false
                    }
                });
                const activeYearData = computed(() => yearData.value[selectedYear.value]);
                const movies = computed(() => activeYearData.value.movies);
                const allFetchedMovies = computed(() =>
                    Object.entries(yearData.value).flatMap(([year, data]) =>
                        data.movies.map(movie => ({ ...movie, year: Number(year) }))
                    )
                );
                const fetchedYearCount = computed(() =>
                    Object.values(yearData.value).filter(data => data.movies.length > 0).length
                );
                const loading = computed(() => activeYearData.value.loading);
                const loadError = computed(() => activeYearData.value.loadError);
                const scannedCategories = computed(() => activeYearData.value.scannedCategories);
                const searchQuery = ref('');
                const currentPage = ref(1);
                const pageSize = 120;
                const totalPages = computed(() =>
                    Math.ceil(filteredMovies.value.length / pageSize)
                );
                const filteredMovies = computed(() => {
                    const query = toTraditionalChinese(searchQuery.value.trim()).toLocaleLowerCase();
                    if (!query) return movies.value;

                    return allFetchedMovies.value.filter(movie =>
                        [movie.displayTitle, movie.year, ...movie.categories]
                            .join(' ')
                            .toLocaleLowerCase()
                            .includes(query)
                    );
                });
                const visibleMovies = computed(() => {
                    const start = (currentPage.value - 1) * pageSize;
                    return filteredMovies.value.slice(start, start + pageSize);
                });
                const visibleMovieTitles = computed(() =>
                    visibleMovies.value.map(movie => `${movie.year || selectedYear.value}:${movie.title}`).join('\n')
                );
                let lastRequestAt = 0;
                let requestQueue = Promise.resolve();

                const isCollectionPage = title =>
                    /列表|清單|電影年表|影片年表/.test(toTraditionalChinese(title));

                const publishMovies = (movieMap, year) => {
                    yearData.value[year].movies = Array.from(movieMap.values(), movie => ({
                        ...movie,
                        displayTitle: toTraditionalChinese(movie.title),
                        categories: Array.from(movie.categories, toTraditionalChinese),
                        primaryCategory: Array.from(movie.categories, category => ({
                            label: toTraditionalChinese(category).replace(/\d{4}年/g, '').trim(),
                            depth: movie.categoryDepths.get(category) || 0
                        }))
                            .filter(category => category.label)
                            .sort((left, right) =>
                                right.depth - left.depth
                                || Number(/^(電影作品|電影)$/.test(left.label)) - Number(/^(電影作品|電影)$/.test(right.label))
                                || right.label.length - left.label.length
                            )[0]?.label || ''
                    })).sort((left, right) => left.displayTitle.localeCompare(right.displayTitle, 'zh-Hant'));
                };

                const requestWikipedia = params => {
                    const request = requestQueue.then(async () => {
                        const wait = Math.max(0, 1000 - (Date.now() - lastRequestAt));
                        if (wait) await new Promise(resolve => setTimeout(resolve, wait));

                        const url = new URL('https://zh.wikipedia.org/w/api.php');
                        params.set('format', 'json');
                        params.set('formatversion', '2');
                        params.set('origin', '*');
                        lastRequestAt = Date.now();
                        const response = await fetch(`${url}?${params.toString()}`);
                        if (!response.ok) {
                            throw new Error(`維基百科 API 回應錯誤（HTTP ${response.status}）。`);
                        }

                        const result = await response.json();
                        if (result.error) {
                            throw new Error(toTraditionalChinese(result.error.info || '維基百科 API 回報錯誤。'));
                        }
                        return result;
                    });
                    requestQueue = request.then(() => undefined, () => undefined);
                    return request;
                };

                const fetchMovieThumbnail = async movie => {
                    if (movie.thumbnailFetched || movie.thumbnailLoading) return;

                    movie.thumbnailLoading = true;
                    try {
                        const title = encodeURIComponent(movie.title.replace(/ /g, '_'));
                        const response = await fetch(
                            `https://zh.wikipedia.org/api/rest_v1/page/summary/${title}`
                        );
                        if (response.status === 404) {
                            movie.thumbnailFetched = true;
                            return;
                        }
                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}`);
                        }

                        const summary = await response.json();
                        movie.thumbnail = summary.thumbnail?.source
                            || summary.originalimage?.source
                            || '';
                        movie.thumbnailFetched = true;
                    } catch (error) {
                        movie.thumbnailFetched = true;
                        console.warn(`無法載入「${movie.title}」的維基百科圖片：`, error);
                    } finally {
                        movie.thumbnailLoading = false;
                    }
                };

                const loadVisibleMovieThumbnails = async () => {
                    if (activeYearData.value.loading) return;

                    const pendingMovies = visibleMovies.value.filter(movie =>
                        !movie.thumbnailFetched && !movie.thumbnailLoading
                    );
                    let nextIndex = 0;
                    const workerCount = Math.min(6, pendingMovies.length);
                    const workers = Array.from({ length: workerCount }, async () => {
                        while (nextIndex < pendingMovies.length) {
                            const movie = pendingMovies[nextIndex++];
                            await fetchMovieThumbnail(movie);
                        }
                    });
                    await Promise.all(workers);
                };

                const handleMovieImageError = event => {
                    const image = event.currentTarget;
                    image.onerror = null;
                    image.src = moviePlaceholder;
                };

                const ensureYearData = year => {
                    if (!yearData.value[year]) {
                        yearData.value[year] = {
                            movies: [], loading: false, loadError: '', scannedCategories: 0, loaded: false
                        };
                    }
                };

                const loadMovies = async (year = selectedYear.value, force = false) => {
                    ensureYearData(year);
                    const yearState = yearData.value[year];
                    if (yearState.loading || (yearState.loaded && !force)) return;

                    yearState.loading = true;
                    yearState.loadError = '';
                    yearState.scannedCategories = 0;
                    yearState.loaded = false;
                    currentPage.value = 1;

                    const categoryQueue = [{ title: `Category:${year}年電影作品`, depth: 0 }];
                    const visitedCategories = new Set();
                    const movieMap = new Map();

                    try {
                        while (categoryQueue.length) {
                            const { title: category, depth: categoryDepth } = categoryQueue.shift();
                            if (visitedCategories.has(category)) continue;
                            visitedCategories.add(category);
                            yearState.scannedCategories = visitedCategories.size;
                            if (visitedCategories.size > 500) {
                                throw new Error('子分類數量超過安全上限（500 個），請縮小分類範圍後再試。');
                            }

                            let continueToken = null;
                            do {
                                const params = new URLSearchParams({
                                    action: 'query',
                                    list: 'categorymembers',
                                    cmtitle: category,
                                    cmtype: 'page|subcat',
                                    cmnamespace: '0|14',
                                    cmlimit: '500'
                                });
                                if (continueToken) params.set('cmcontinue', continueToken);
                                const result = await requestWikipedia(params);
                                for (const member of result.query.categorymembers) {
                                    if (member.ns === 14) {
                                        categoryQueue.push({ title: member.title, depth: categoryDepth + 1 });
                                        continue;
                                    }
                                    if (member.ns !== 0) continue;
                                    if (isCollectionPage(member.title)) continue;

                                    const movie = movieMap.get(member.title) || {
                                        title: member.title,
                                        categories: new Set(),
                                        categoryDepths: new Map(),
                                        thumbnail: '',
                                        thumbnailFetched: false,
                                        thumbnailLoading: false
                                    };
                                    const categoryName = category.replace(/^Category:/, '');
                                    movie.categories.add(categoryName);
                                    movie.categoryDepths.set(
                                        categoryName,
                                        Math.max(movie.categoryDepths.get(categoryName) || 0, categoryDepth)
                                    );
                                    movieMap.set(member.title, movie);
                                }
                                continueToken = result.continue?.cmcontinue || null;
                            } while (continueToken);

                            publishMovies(movieMap, year);
                        }
                        yearState.loaded = true;
                    } catch (error) {
                        yearState.loadError = error instanceof Error
                            ? error.message
                            : '無法載入維基百科電影資料。';
                        publishMovies(movieMap, year);
                    } finally {
                        yearState.loading = false;
                    }
                };

                const selectYear = year => {
                    selectedYear.value = year;
                    yearDropdownOpen.value = false;
                    currentPage.value = 1;
                    loadMovies(year);
                };

                const closeYearDropdownOnOutsideClick = event => {
                    if (!yearDropdownRef.value?.contains(event.target)) {
                        yearDropdownOpen.value = false;
                    }
                };

                onMounted(() => {
                    document.addEventListener('pointerdown', closeYearDropdownOnOutsideClick);
                    loadMovies();
                });
                watch(
                    [selectedYear, visibleMovieTitles, () => activeYearData.value.loading],
                    loadVisibleMovieThumbnails
                );
                onBeforeUnmount(() => {
                    document.removeEventListener('pointerdown', closeYearDropdownOnOutsideClick);
                });

                return {
                    years,
                    fetchedYearCount,
                    selectedYear,
                    yearDropdownOpen,
                    yearDropdownRef,
                    movies,
                    loading,
                    loadError,
                    scannedCategories,
                    searchQuery,
                    currentPage,
                    totalPages,
                    filteredMovies,
                    visibleMovies,
                    loadMovies,
                    moviePlaceholder,
                    handleMovieImageError,
                    selectYear
                };
            },
            template: `
                <main class="container py-5">
                    <header class="bg-dark text-white rounded-4 p-4 p-md-5 mb-4">
                        <h1 class="display-5 fw-bold mb-1">{{ selectedYear }} 年電影作品</h1>
                        <p class="lead text-white-50 mb-0">依維基百科主分類及其子分類整理，涵蓋各地區與不同類型的電影條目。</p>
                    </header>

                    <section aria-labelledby="movie-list-title">
                        <div class="row g-3 align-items-end mb-3">
                            <div class="col-12 col-md-3">
                                <div ref="yearDropdownRef" class="movie-year-picker">
                                    <span class="form-label fw-bold" id="movie-year-label">電影年份</span>
                                    <button id="movie-year" type="button" class="form-select text-start"
                                        :aria-label="'電影年份：' + selectedYear + ' 年'"
                                        aria-haspopup="listbox" :aria-expanded="yearDropdownOpen"
                                        aria-controls="movie-year-options"
                                        @click="yearDropdownOpen = !yearDropdownOpen"
                                        @keydown.esc.stop.prevent="yearDropdownOpen = false">
                                        {{ selectedYear }} 年
                                    </button>
                                    <div v-if="yearDropdownOpen" id="movie-year-options"
                                        class="movie-year-menu" role="listbox" aria-labelledby="movie-year-label"
                                        @keydown.esc.stop.prevent="yearDropdownOpen = false">
                                        <button v-for="year in years" :key="year" type="button" role="option"
                                            class="movie-year-option" :class="{ selected: selectedYear === year }"
                                            :aria-selected="selectedYear === year"
                                            @click="selectYear(year)">{{ year }} 年</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <label for="movie-search" class="form-label fw-bold">搜尋電影、地區或類型</label>
                                <input id="movie-search" v-model="searchQuery"
                                    @input="currentPage = 1" type="search" class="form-control"
                                    placeholder="輸入片名、國家／地區或分類">
                            </div>
                            <div class="col-12 col-md-auto">
                                <button @click="loadMovies(selectedYear, true)" :disabled="loading"
                                    class="btn btn-outline-primary w-100">
                                    {{ loading ? '載入中…' : '重新載入資料' }}
                                </button>
                            </div>
                        </div>

                        <p class="text-muted" aria-live="polite">
                            <template v-if="searchQuery">
                                已搜尋 {{ fetchedYearCount }} 個已取得年份，共 {{ filteredMovies.length }} 筆符合條件的電影。
                            </template>
                            <template v-else>
                                已整理 {{ movies.length }} 部電影，掃描 {{ scannedCategories }} 個分類；
                                目前年份有 {{ filteredMovies.length }} 筆電影條目。
                            </template>
                        </p>
                        <div v-if="loading" class="alert alert-info" role="status">
                            正在向維基百科載入電影分類與圖片，請稍候。
                        </div>
                        <div v-if="loadError" class="alert alert-warning" role="alert">
                            資料載入未完成：{{ loadError }}<span v-if="movies.length">目前顯示的是部分結果，可稍後重新載入。</span>
                        </div>
                        <h2 id="movie-list-title" class="visually-hidden">電影清單</h2>

                        <div v-if="visibleMovies.length" class="movie-grid mb-3">
                            <div v-for="movie in visibleMovies" :key="movie.title" class="movie-grid-item">
                                <a :href="'https://zh.wikipedia.org/wiki/' + encodeURIComponent(movie.title.replace(/ /g, '_'))"
                                    target="_blank" rel="noopener noreferrer"
                                    class="card movie-card h-100 border-0 shadow-sm text-decoration-none text-dark">
                                    <div class="card-body d-flex align-items-start gap-2">
                                        <img :src="movie.thumbnail || moviePlaceholder"
                                            :alt="movie.displayTitle + ' 電影圖片'"
                                            class="movie-poster flex-shrink-0" loading="lazy"
                                            @error="handleMovieImageError">
                                        <div class="movie-card-copy">
                                            <span v-if="searchQuery" class="movie-result-year">{{ movie.year }} 年</span>
                                            <h3 class="movie-title fw-bold mb-2">{{ movie.displayTitle }}</h3>
                                            <div class="d-flex flex-wrap gap-1">
                                                <span v-if="movie.primaryCategory"
                                                    class="badge movie-category text-bg-light border text-secondary">
                                                    {{ movie.primaryCategory }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <p v-else-if="!loading && !loadError" class="alert alert-secondary" role="status">
                            沒有符合條件的電影資料。
                        </p>

                        <nav v-if="totalPages > 1" aria-label="電影清單分頁">
                            <ul class="pagination justify-content-center flex-wrap">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <button class="page-link" :disabled="currentPage === 1"
                                        @click="currentPage--" aria-label="上一頁">上一頁</button>
                                </li>
                                <li v-for="page in totalPages" :key="page" class="page-item"
                                    :class="{ active: currentPage === page }">
                                    <button class="page-link" @click="currentPage = page"
                                        :aria-label="'第 ' + page + ' 頁'"
                                        :aria-current="currentPage === page ? 'page' : null">{{ page }}</button>
                                </li>
                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <button class="page-link" :disabled="currentPage === totalPages"
                                        @click="currentPage++" aria-label="下一頁">下一頁</button>
                                </li>
                            </ul>
                        </nav>
                    </section>

                    <aside class="small text-muted border-top pt-3 mt-4">
                        分類、條目導言與可用縮圖取自維基百科；圖片授權依各來源檔案頁面為準。本頁內容可能隨來源更新。
                        請點選片名查看條目及圖片來源資訊。
                        <a :href="'https://zh.wikipedia.org/zh-tw/Category:' + selectedYear + '年電影作品'"
                            target="_blank" rel="noopener noreferrer">維基百科：{{ selectedYear }}年電影作品分類</a>
                    </aside>
                </main>
            `
        };

        // ── 2026 世界盃資訊元件 ──
        const WorldCup = {
            setup() {
                const groups = [
                    { name: 'A', teams: [
                        { country: '墨西哥', stars: '聖地牙哥・希門尼斯、希爾文・洛薩諾' },
                        { country: '南非', stars: '珀西・陶、萊爾・福斯特' },
                        { country: '南韓', stars: '孫興慜、李剛仁' },
                        { country: '捷克', stars: '帕特里克・希克' }
                    ] },
                    { name: 'B', teams: [
                        { country: '加拿大', stars: '阿方索・戴維斯、強納森・大衛' },
                        { country: '波士尼亞與赫塞哥維納', stars: '艾丁・哲科、阿馬爾・德迪奇' },
                        { country: '瑞士', stars: '格蘭尼特・扎卡、布雷爾・恩博洛' },
                        { country: '卡達', stars: '阿克拉姆・阿菲夫' }
                    ] },
                    { name: 'C', teams: [
                        { country: '巴西', stars: '維尼修斯・儒尼奧爾、拉菲尼亞' },
                        { country: '摩洛哥', stars: '阿什拉夫・哈基米、布拉欣・迪亞斯' },
                        { country: '海地', stars: '杜肯斯・納宗' },
                        { country: '蘇格蘭', stars: '安德魯・羅伯森、史考特・麥克托米奈' }
                    ] },
                    { name: 'D', teams: [
                        { country: '美國', stars: '克里斯蒂安・普利西奇、韋斯頓・麥肯尼' },
                        { country: '巴拉圭', stars: '胡利奧・恩西索、米格爾・阿爾米隆' },
                        { country: '澳洲', stars: '哈里・蘇塔、馬修・萊恩' },
                        { country: '土耳其', stars: '阿爾達・居萊爾、哈坎・恰爾汗奧盧' }
                    ] },
                    { name: 'E', teams: [
                        { country: '德國', stars: '賈馬爾・穆夏拉、弗洛里安・維爾茨' },
                        { country: '古拉索', stars: '塔希斯・鐘、萊安德羅・巴庫納' },
                        { country: '象牙海岸', stars: '法蘭克・凱西、賽門・阿丁格拉' },
                        { country: '厄瓜多', stars: '莫伊塞斯・凱塞多、恩納・瓦倫西亞' }
                    ] },
                    { name: 'F', teams: [
                        { country: '荷蘭', stars: '維吉爾・范戴克、科迪・加克波' },
                        { country: '日本', stars: '三笘薰、久保建英' },
                        { country: '瑞典', stars: '亞歷山大・伊薩克、維克托・約克雷斯' },
                        { country: '突尼西亞', stars: '艾利斯・斯希里、漢尼拔・梅布里' }
                    ] },
                    { name: 'G', teams: [
                        { country: '比利時', stars: '凱文・德布勞內、傑瑞米・多庫' },
                        { country: '埃及', stars: '穆罕默德・沙拿' },
                        { country: '伊朗', stars: '邁赫迪・塔雷米、薩達爾・阿茲蒙' },
                        { country: '紐西蘭', stars: '克里斯・伍德' }
                    ] },
                    { name: 'H', teams: [
                        { country: '西班牙', stars: '拉明・亞馬爾、羅德里' },
                        { country: '維德角', stars: '萊恩・門德斯、達隆・利弗拉門托' },
                        { country: '沙烏地阿拉伯', stars: '沙林・多薩里' },
                        { country: '烏拉圭', stars: '費德里科・巴爾韋德、達爾文・努涅斯' }
                    ] },
                    { name: 'I', teams: [
                        { country: '法國', stars: '基利安・姆巴佩、奧斯曼・登貝萊' },
                        { country: '塞內加爾', stars: '薩迪奧・馬內、尼古拉・傑克森' },
                        { country: '伊拉克', stars: '艾曼・侯賽因、阿里・賈西姆' },
                        { country: '挪威', stars: '厄林・哈蘭德、馬丁・厄德高' }
                    ] },
                    { name: 'J', teams: [
                        { country: '阿根廷', stars: '利昂內爾・梅西、勞塔羅・馬丁內斯' },
                        { country: '阿爾及利亞', stars: '里亞德・馬列斯、伊斯梅爾・班納塞' },
                        { country: '奧地利', stars: '大衛・阿拉巴、馬塞爾・薩比策' },
                        { country: '約旦', stars: '穆薩・塔馬里' }
                    ] },
                    { name: 'K', teams: [
                        { country: '葡萄牙', stars: '克里斯蒂亞諾・羅納度、布魯諾・費南德斯' },
                        { country: '剛果民主共和國', stars: '尤安・維薩、塞德里克・巴坎布' },
                        { country: '烏茲別克', stars: '艾多爾・肖穆羅多夫、阿布杜科迪爾・胡桑諾夫' },
                        { country: '哥倫比亞', stars: '路易斯・迪亞斯、哈梅斯・羅德里奎茲' }
                    ] },
                    { name: 'L', teams: [
                        { country: '英格蘭', stars: '哈里・凱恩、裘德・貝林漢' },
                        { country: '克羅埃西亞', stars: '盧卡・莫德里奇、約什科・格瓦迪奧爾' },
                        { country: '迦納', stars: '穆罕默德・庫杜斯、湯瑪斯・帕提' },
                        { country: '巴拿馬', stars: '阿達爾貝托・卡拉斯基亞、伊斯梅爾・迪亞斯' }
                    ] }
                ];
                return { groups };
            },
            template: `
                <main class="container py-5">
                    <header class="bg-dark text-white rounded-4 p-4 p-md-5 mb-4">
                        <p class="text-uppercase text-info fw-bold mb-2">國際足總世界盃 · 2026</p>
                        <h1 class="display-5 fw-bold mb-1">2026 世足資訊</h1>
                        <p class="lead text-white-50 mb-0">48 支國家隊、12 個小組，一次掌握分組名單與代表球星。</p>
                    </header>

                    <section aria-labelledby="world-cup-groups">
                        <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
                            <div>
                                <h2 id="world-cup-groups" class="h3 fw-bold mb-1">A–L 組參賽球隊</h2>
                                <p class="text-muted mb-0">每組 4 隊；球星列舉為代表性焦點球員。</p>
                            </div>
                            <span class="badge text-bg-dark fs-6">12 組・48 隊</span>
                        </div>

                        <div class="row g-3">
                            <div v-for="group in groups" :key="group.name" class="col-sm-6 col-lg-4 col-xl-3">
                                <article class="card h-100 border-0 shadow-sm">
                                    <div class="card-header bg-primary text-white fw-bold py-2">{{ group.name }} 組</div>
                                    <ul class="list-group list-group-flush">
                                        <li v-for="team in group.teams" :key="team.country" class="list-group-item px-3 py-2">
                                            <h3 class="h6 fw-bold mb-1">{{ team.country }}</h3>
                                            <p class="small text-muted mb-0">球星焦點：{{ team.stars }}</p>
                                        </li>
                                    </ul>
                                </article>
                            </div>
                        </div>
                    </section>

                    <aside class="small text-muted border-top pt-3 mt-4">
                        分組名單依指定文章整理；代表球星為觀賽參考，並非官方最終球員名單或出賽確認。
                        <a href="https://www.worldcupfifa.com.tw/post/world-cup-2026-48-teams-groups-quick-guide"
                            target="_blank" rel="noopener noreferrer">查看來源文章</a>。
                        最終球員名單與賽事資訊請以
                        <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
                            target="_blank" rel="noopener noreferrer">FIFA 官方網站</a>為準。
                    </aside>
                </main>
            `
        };

        // 路由
        const routes = [
            { path: '/', component: Home },
            { path: '/brands', component: Brands },
            { path: '/supercars', component: About },
            { path: '/movies', component: Counter },
            { path: '/world-cup', component: WorldCup },
            { path: '/about', redirect: '/supercars' },
            { path: '/counter', redirect: '/movies' },
            { path: '/data', redirect: '/world-cup' }
        ];

        const router = createRouter({
            history: createWebHashHistory(),
            routes
        });

        // 主 App
        const App = {
            template: `
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
                        <div class="container">
                            <router-link to="/" class="navbar-brand fs-5 fw-bold">WxFoo資訊集散地</router-link>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="nav">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item"><router-link to="/movies" class="nav-link px-3">世界電影表</router-link></li>
                                    <li class="nav-item"><router-link to="/brands" class="nav-link px-3">品牌資訊</router-link></li>
                                    <li class="nav-item"><router-link to="/supercars" class="nav-link px-3">超跑資訊</router-link></li>
                                    <li class="nav-item"><router-link to="/world-cup" class="nav-link px-3">世足資訊</router-link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <router-view></router-view>

                    <footer class="bg-dark text-white py-4 small">
                        <div class="container footer-content">
                            <span>© 2025-${new Date().getFullYear()} WxFoo資訊集散地 , Inc . All rights reserved</span>
                            <button class="back-to-top-btn" type="button" aria-label="回到頁面最上方" title="回到最上方" @click="scrollToTop">
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                    <path d="M12 19V5m-7 7 7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                    </footer>
                </div>
            `,
            methods: {
                scrollToTop() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        };

        // 啟動
        createApp(App).use(router).mount('#app');
