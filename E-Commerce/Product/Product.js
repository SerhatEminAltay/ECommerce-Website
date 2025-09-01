document.addEventListener('DOMContentLoaded', function() {
    var authContainer = document.getElementById('auth-container');
    var firstName = localStorage.getItem('firstName');
    var lastName = localStorage.getItem('lastName');
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (firstName && lastName && isLoggedIn) {
        authContainer.innerHTML = `
            <div class="account-dropdown">
                <button class="account">${firstName} ${lastName}</button>
                <div class="dropdown-content">
                    <span class="triangle"></span>
                    <a href="#" id="logout">Çıkış Yap</a>
                </div>
            </div>
        `;

        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = window.location.pathname; // Sayfayı yeniden yükle
        });
    } else {
        authContainer.innerHTML = `
            <div class="sign-in-dropdown">
                <button class="sign-in">Giriş Yap</button>
                <div class="dropdown-content">
                    <span class="triangle"></span>
                    <a href="../Giriş/Giriş.html">Giriş Yap</a>
                    <a href="../Kayıt Ol/Kayıt Ol.html">Üye Ol</a>
                </div>
            </div>
        `;
    }

    var accountLink = document.getElementById('account-link');
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        accountLink.href = '../Hesabım/Hesabım.html';
    } else {
        accountLink.href = '../Giriş/Giriş.html';
    }

    // Ürün açıklamaları
    const productDescriptions = {
        // Giyim
        'citcit-detayli-tisort': 'Çıtçıt Detaylı Tişört, pamuk içerikli jakarlı dokuya sahiptir. Uzun kollu, sıfır yaka ve bedeni saran esnek fit yapısıyla rahat bir kullanım sunar. Yakası çıtçıt kapamalıdır.',
        'fermuarli-bomber-hirka': 'Fermuarlı Bomber Hırka, soğuk havalarda sizi sıcak tutar. Yumuşak dokusu ve rahat kesimi ile günlük kullanım için idealdir.',
        'pamuklu-kare-yaka-atlet': 'Pamuklu Kare Yaka Atlet, %100 pamuklu kumaşı ile cildinize dosttur. Kare yaka detayı ve rahat kesimi ile şıklığı ve konforu bir arada sunar.',
        'polo-yaka-tisort': 'Polo Yaka Tişört, klasik ve şık bir görünüm sunar. %100 pamuklu kumaşı ile nefes alabilir ve rahat bir kullanım sağlar.',
        'sifir-yaka-pamuklu-tisort': 'Sıfır Yaka Pamuklu Tişört, yumuşak ve rahat bir yapıya sahiptir. Günlük kullanım için ideal olan bu tişört, %100 pamuklu kumaşı ile cildinize dosttur.',
        'yuksek-bel-bootcut-pantolon': 'Yüksek Bel Bootcut Pantolon, modern ve şık bir tasarıma sahiptir. Esnek kumaşı ve yüksek bel detayı ile rahat bir kullanım sunar.',
        'yuksek-bel-wide-leg-pantolon': 'Yüksek Bel Wide-Leg Pantolon, geniş paça kesimi ile rahat bir kullanım sunar. Şık ve modern tasarımı ile her ortamda dikkat çeker.',
        'yuksek-yaka-cut-out-tisort': 'Yüksek Yaka Cut-Out Detaylı Tişört, şık ve modern bir tasarıma sahiptir. Yüksek yaka detayı ve kesik detayları ile tarzınızı yansıtın.',
        'yumusak-dokulu-kayik-yaka-kazak': 'Yumuşak Dokulu Kayık Yaka Kazak, soğuk havalarda sizi sıcak tutar. Yumuşak dokusu ve kayık yaka detayı ile şıklığı ve konforu bir arada sunar.',
        
        // Ayakkabı
        'baglama-detayli-bot': 'Bağlama Detaylı Bot, şık ve rahat bir tasarıma sahiptir. Bağlama detayı ile ayaklarınıza tam uyum sağlar.',
        'nakisli-kapitone-topuklu-bot': 'Nakışlı Kapitone Topuklu Bot, zarif ve şık bir görünüm sunar. Kapitone detayı ve nakış işlemeleri ile dikkat çeker.',
        'toka-detayli-bot': 'Toka Detaylı Bot, modern ve şık bir tasarıma sahiptir. Toka detayı ile tarzınızı yansıtın.',
        'toka-detayli-kovboy-bot': 'Toka Detaylı Kovboy Bot, klasik kovboy tarzını yansıtır. Toka detayı ve rahat kesimi ile günlük kullanım için idealdir.',
        'toka-detayli-topuklu-bot': 'Toka Detaylı Topuklu Bot, zarif ve şık bir görünüm sunar. Toka detayı ve topuklu yapısı ile şıklığı ve rahatlığı bir arada sunar.',
        'toka-detayli-uzun-cizme': 'Toka Detaylı Uzun Çizme, soğuk havalarda sıcak tutar. Uzun yapısı ve toka detayı ile şıklığı ve konforu bir arada sunar.',
        'nakisli-kovboy-bot': 'Nakışlı Kovboy Bot, şık ve rahat bir tasarıma sahiptir. Nakış işlemeleri ile dikkat çeker.',
        'vegan-deri-uzun-cizme': 'Vegan Deri Uzun Çizme, çevre dostu ve şık bir seçenektir. Vegan deri yapısı ile hem şıklığı hem de doğa dostu bir tercihi bir arada sunar.',
        'yuksek-tabanli-spor-ayakkabi': 'Yüksek Tabanlı Spor Ayakkabı, rahat ve şık bir tasarıma sahiptir. Yüksek tabanı ile konforlu bir kullanım sunar.',
        
        // Çanta
        'askili-canta-black': 'Askılı Çanta, günlük kullanım için idealdir. Şık ve kullanışlı tasarımı ile her ortamda rahatlıkla kullanabilirsiniz.',
        'askili-canta': 'Askılı Çanta, şık ve kullanışlı bir tasarıma sahiptir. Günlük kullanım için idealdir.',
        'hasir-canta': 'Hasır Çanta, yaz aylarında kullanmak için mükemmeldir. Doğal dokusu ve şık tasarımı ile dikkat çeker.',
        'leopar-desenli-askili-canta': 'Leopar Desenli Askılı Çanta, şık ve modern bir tasarıma sahiptir. Leopar deseni ile tarzınızı yansıtın.',
        'parlak-dokulu-omuz-cantasi': 'Parlak Dokulu Omuz Çantası, zarif ve şık bir görünüm sunar. Parlak dokusu ile dikkat çeker.',
        'toka-detayli-canta': 'Toka Detaylı Çanta, modern ve şık bir tasarıma sahiptir. Toka detayı ile tarzınızı yansıtın.',
        'tokali-baget-canta': 'Tokalı Baget Çanta, günlük kullanım için idealdir. Şık ve kullanışlı tasarımı ile her ortamda rahatlıkla kullanabilirsiniz.',
        'uzun-askili-canta': 'Uzun Askılı Çanta, rahat ve kullanışlı bir tasarıma sahiptir. Uzun askısı ile konforlu bir kullanım sunar.',
        'vegan-deri-sirt-cantasi': 'Vegan Deri Sırt Çantası, çevre dostu ve şık bir seçenektir. Vegan deri yapısı ile hem şıklığı hem de doğa dostu bir tercihi bir arada sunar.',
        
        // Aksesuar
        'basic-cap-sapka': 'Basic Cap Şapka, rahat ve şık bir tasarıma sahiptir. Günlük kullanım için idealdir.',
        'desenli-kalin-sal': 'Desenli Kalın Şal, soğuk havalarda sıcak tutar. Desenli yapısı ile şıklığı ve konforu bir arada sunar.',
        'leopar-desenli-kalin-sal': 'Leopar Desenli Kalın Şal, şık ve modern bir tasarıma sahiptir. Leopar deseni ile tarzınızı yansıtın.',
        'yun-karisimli-bere': 'Yün Karışımlı Bere, soğuk havalarda sıcak tutar. Yün karışımlı yapısı ile konforlu bir kullanım sunar.',
        'pelus-detayli-eldiven': 'Peluş Detaylı Eldiven, yumuşak ve rahat bir yapıya sahiptir. Soğuk havalarda ellerinizi sıcak tutar.',
        'ponponlu-bere': 'Ponponlu Bere, şık ve modern bir tasarıma sahiptir. Ponpon detayı ile tarzınızı yansıtın.',
        'sallantili-kupe1': 'Sallantılı Küpe, zarif ve şık bir görünüm sunar. Sallantılı yapısı ile dikkat çeker.',
        'sallantili-kupe2': 'Sallantılı Küpe, zarif ve şık bir görünüm sunar. Sallantılı yapısı ile dikkat çeker.',
        'yuvarlak-kupe': 'Yuvarlak Küpe, modern ve şık bir tasarıma sahiptir. Yuvarlak yapısı ile tarzınızı yansıtın.',
        
    };

    // URL parametrelerini al
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const color = urlParams.get('color');
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');
    const sizeSelect = document.getElementById('size'); // Beden seçeneği dropdown'u
    sizeSelect.innerHTML = ''; // Dropdown'u temizle

    // Giyim kategorisi için renk seçeneklerini kaldır
    if (category === 'clothes') {
        document.querySelector('.color-options').style.display = 'none';
    }

    // Giyim kategorisi hariç renk seçeneklerini görünmez kaldırır
    if (category === 'shoes' || category === 'accessories' || category === 'bags') {
        document.querySelector('.color-options').style.display = 'none';
    }

    // Çanta kategorisi için beden seçeneğini kaldırır
    if (category === 'bags') {
        document.querySelector('.size-options').style.display = 'none';
    }
    
    // Aksesuar kategorisi ve bazı ürünler için beden seçeneğini kaldırır
    if (category === 'accessories' && (productId === 'sallantili-kupe1' || productId === 'sallantili-kupe2' || productId === 'yuvarlak-kupe')) {
        document.querySelector('.size-options').style.display = 'none';
    }

    // Beden seçeneklerini ekle
    let sizes = [];
    if (category === 'clothes') {
        sizes = ['Seçin', 'XS', 'S', 'M', 'L', 'XL'];
    } else if (category === 'shoes') {
        sizes = ['Seçin', '36', '37', '38', '39', '40'];
    } else if (category === 'accessories' || category === 'bags') {
        sizes = ['Standart'];
    }

    sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size.toLowerCase();
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    // Ürün bilgilerini sayfaya yerleştir
    document.querySelector('.product-info h1').textContent = productName;
    document.querySelector('.product-info .price').textContent = productPrice + ' ₺';
    document.querySelector('.product-images #main-image').src = productImage;
    document.querySelector('.product-images #main-image').alt = productName;
    document.querySelector('.product-info .description').textContent = productDescriptions[productId] || 'Ürün açıklaması bulunmamaktadır.';

    // Varsayılan resimleri yükle
    loadThumbnails(category, productId);

    // Hata mesajı için bir eleman oluştur
    const errorMessage = document.createElement('p');
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    errorMessage.style.marginTop = '10px'; // Hata mesajını biraz aşağıya almak için
    errorMessage.textContent = 'Beden Seçmelisiniz!';
    document.querySelector('.product-info').appendChild(errorMessage);

    // Sepete ekle butonuna tıklama olayı
    document.querySelector('.add-to-cart').addEventListener('click', function() {
        const selectedSize = sizeSelect.value;

        // Beden seçilmemişse hata mesajını göster
        if ((category === 'clothes' || category === 'shoes') && selectedSize === 'seçin') {
            errorMessage.style.display = 'block';
            return;
        }

        // Show confirmation card
        const confirmationCard = document.createElement('div');
        confirmationCard.className = 'confirmation-card';
        confirmationCard.innerHTML = `
            <img src="${productImage}" alt="${productName}" class="confirmation-image">
            <p><span class="checkmark">✔</span> ${productName} sepete eklendi</p>
            <button class="go-to-cart">Sepete Git</button>
            <button class="continue-shopping">Alışverişe Devam Et</button>
        `;
        document.body.appendChild(confirmationCard);

        // Event listeners for buttons
        document.querySelector('.go-to-cart').addEventListener('click', function() {
            window.location.href = '../Sepetim/Sepetim.html';
        });

        document.querySelector('.continue-shopping').addEventListener('click', function() {
            window.history.back();
        });

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.id === productId && item.size === selectedSize);

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += 1;
        } else {
            cartItems.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                size: selectedSize,
                quantity: 1,
                image: productImage // Resim URL'sini ekle
            });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
    });
});

function changeImage(element) {
    document.getElementById('main-image').src = element.src;
}

function loadThumbnails(category, productId) {
    const thumbnailContainer = document.getElementById('thumbnail-images');
    thumbnailContainer.innerHTML = ''; // Mevcut thumbnail'ları temizle

    // Dinamik resim yolları oluştur
    for (let i = 7; i >= 1; i--) {
        const imgPath = `../Resimler/oxxo ${category}/${productId}/image${i}.jpg`;
        const img = new Image();
        img.src = imgPath;
        img.onload = function() {
            const imgElement = document.createElement('img');
            imgElement.src = imgPath;
            imgElement.alt = 'Ürün Resmi';
            imgElement.onclick = function() {
                changeImage(this);
            };
            thumbnailContainer.appendChild(imgElement);

            // Ana resmi ilk thumbnail resmi ile güncelle
            if (i === 1) {
                document.getElementById('main-image').src = imgPath;
            }
        };
    }
}

// Sepetteki ürün adedini güncelleyen işlev
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCount > 0) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = 'inline';
    } else {
        cartCountElement.style.display = 'none';
    }
}

// Sayfa yüklendiğinde sepetteki ürün adedini güncelle
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    // Diğer kodlar...
});