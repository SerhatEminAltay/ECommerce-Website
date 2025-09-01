// Fotoğraf değiştirme işlevi
const images = [
    "../resimler/AnasayfaFoto1.jpeg",
    "../resimler/AnasayfaFoto2.jpg"
];  // Fotoğrafların dizisi

let currentIndex = 0; // Başlangıçtaki fotoğrafın indeksini 0 yapıyoruz

const photoElement = document.getElementById("photo");  // Fotoğrafı alıyoruz

function changeImage() {
    currentIndex++;  // Fotoğraf indeksini artırıyoruz

    if (currentIndex >= images.length) {
        currentIndex = 0;  // Eğer son fotoğrafa geldiysek, başa dönüyoruz
    }

    // Fotoğraf kaynağını güncelliyoruz
    photoElement.src = images[currentIndex];
}

// Fotoğrafı her 5 saniyede bir değiştirmek için setInterval kullanıyoruz
setInterval(changeImage, 5000); // 5000 ms = 5 saniye

// Kullanıcı oturum açma durumu kontrolü ve butonları güncelleme
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

    // Search functionality
    document.querySelector('.searchItem input[type="text"]').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            var searchQuery = event.target.value.trim().toLowerCase();
            if (searchQuery === 'giyim') {
                window.location.href = '../Giyim/Giyim.html';
            } else if (searchQuery === 'aksesuar') {
                window.location.href = '../Aksesuar/Aksesuar.html';
            } else if (searchQuery === 'ayakkabı') {
                window.location.href = '../Ayakkabı/Ayakkabı.html';
            } else if (searchQuery === 'çanta') {
                window.location.href = '../Çanta/Çanta.html';
            } else {
                // Assume it's a product name and navigate to a product page
                window.location.href = '../Product/Product.html?name=' + encodeURIComponent(searchQuery);
            }
        }
    });

});

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