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

    // Sepet toplamını ve toplam fiyatı hesapla
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartTotal = 0; // Sepetteki ürünlerin toplam fiyatı
    var shippingCost = 34.95; // Kargo ücreti

    // Sepet öğelerini sayfaya ekle
    var cartItemsContainer = document.querySelector('.cart-items');
    cartItems.forEach(function(item, index) {
        var formattedSize = item.size === 'standart' ? 'Standart' : item.size.toUpperCase();
        var itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Beden: ${formattedSize}</p>
                <p>Fiyat: ${item.price.toFixed(2)} TL</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        cartTotal += item.price * item.quantity;
    });

    // Sepet toplamını güncelle
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2) + ' TL';
    document.getElementById('total-price').textContent = (cartTotal + shippingCost).toFixed(2) + ' TL';

    // Miktar düğmelerine tıklama olayları
    document.querySelectorAll('.quantity-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'));
            var action = this.getAttribute('data-action');
            if (action === 'increase') {
                cartItems[index].quantity += 1;
            } else if (action === 'decrease') {
                cartItems[index].quantity -= 1;
                if (cartItems[index].quantity === 0) {
                    cartItems.splice(index, 1);
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            window.location.reload();
        });
    });

    // Devam Et butonuna tıklama olayı
    document.querySelector('.checkout-button').addEventListener('click', function() {
        if (cartItems.length === 0) {
            alert('Sepetiniz boş.');
        } else {
            window.location.href = '../Ödeme/odeme.html';
        }
    });

    // Alışverişe Dön butonuna tıklama olayı
    document.querySelector('.continue-shopping-button').addEventListener('click', function() {
        window.history.back();
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