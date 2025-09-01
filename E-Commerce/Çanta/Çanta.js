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

    // Filter functionality
    document.querySelectorAll('.filter input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            filterProducts();
        });
    });

    function filterProducts() {
        var selectedPrices = Array.from(document.querySelectorAll('.filter input[type="checkbox"]:checked'))
            .map(function(checkbox) {
                return checkbox.id;
            });

        document.querySelectorAll('.product').forEach(function(product) {
            var productPrice = parseFloat(product.getAttribute('data-price'));

            var priceMatch = selectedPrices.length === 0 || selectedPrices.some(function(priceRange) {
                if (priceRange === '1200+') {
                    return productPrice >= 1200;
                }
                var [min, max] = priceRange.split('-').map(Number);
                return productPrice >= min && productPrice <= max;
            });

            if (priceMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});

function redirectToProduct(category, id, name, price, image) {
    window.location.href = `../Product/Product.html?category=${category}&id=${id}&name=${name}&price=${price}&image=${image}`;
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