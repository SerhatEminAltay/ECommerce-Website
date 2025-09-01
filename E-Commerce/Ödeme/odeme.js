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

    // Sepet öğelerini sipariş özetine ekle
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var orderSummaryContainer = document.querySelector('.cart-items');
    cartItems.forEach(function(item) {
        var formattedSize = item.size === 'standart' ? 'Standart' : item.size.toUpperCase();
        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Beden: ${formattedSize}</p>
                <p>Adet: ${item.quantity}</p>
                <p>Fiyat: ${item.price.toFixed(2)} TL</p>
            </div>
        `;
        orderSummaryContainer.appendChild(itemElement);
    });

    // Sepet toplamını ve toplam fiyatı hesapla
    var cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    var shippingCost = 34.95; // Kargo ücreti
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2) + ' TL';
    document.getElementById('total-price').textContent = (cartTotal + shippingCost).toFixed(2) + ' TL';

    // İndirim kuponu uygulama
    document.getElementById('apply-coupon').addEventListener('click', function() {
        var coupon = document.getElementById('coupon').value.trim();
        var couponError = document.getElementById('coupon_error');
        var discount = 0;
        var cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        if (coupon === 'INDIRIM10') {
            discount = 10; // 10 TL indirim
            couponError.style.display = 'none';
        } else if (coupon === 'ekiyak') {
            discount = cartTotal; // %100 indirim
            couponError.style.display = 'none';
        } else if (coupon === 'merhaba20') {
            discount = cartTotal * 0.20; // %20 indirim
            couponError.style.display = 'none';
        } else if (coupon === 'SirHot') {
            discount = cartTotal * 0.50; // %50 indirim
            couponError.style.display = 'none';
        } else {
            couponError.style.display = 'block';
        }

        var shippingCost = 34.95; // Kargo ücreti
        var totalPrice = cartTotal + shippingCost - discount;

        document.getElementById('cart-total').textContent = cartTotal.toFixed(2) + ' TL';
        document.getElementById('total-price').textContent = totalPrice.toFixed(2) + ' TL';
        document.getElementById('discount-amount').textContent = '-' + discount.toFixed(2) + ' TL';
        document.getElementById('discount-section').style.display = discount > 0 ? 'flex' : 'none';
    });

   // Ödeme formunu gönderme olayı
   document.querySelector('.payment-button').addEventListener('click', function(event) {
    event.preventDefault();

    var isValid = true;

    // Form alanlarını kontrol et
    ['first_name', 'last_name', 'city', 'address', 'phone', 'card_name', 'card_number', 'expiry_date', 'cvv'].forEach(function(field) {
        var input = document.getElementById(field);
        var error = document.getElementById(field + '_error');
        if (input.value.trim() === '') {
            error.style.display = 'block';
            isValid = false;
        } else {
            error.style.display = 'none';
        }
    });

    if (isValid) {
        showConfirmationModal();
        localStorage.removeItem('cartItems'); // Sepeti temizle
    } else {
        showErrorModal();
    }
});

function showConfirmationModal() {
    var modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="modal-body">
                <div class="checkmark-circle">
                    <div class="checkmark"></div>
                </div>
                <h2>Siparişiniz alınmıştır</h2>
                <p>Bizi tercih ettiğiniz için teşekkür ederiz.</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    var closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
        modal.remove();
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });

    // 3 saniye sonra anasayfa.html sayfasına yönlendir
    setTimeout(function() {
        window.location.href = '../Anasayfa/anasayfa.html';
    }, 3000);
}

function showErrorModal() {
    var modal = document.createElement('div');
    modal.className = 'error-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="modal-body">
                <h2>Ödeme Bilgilerini Tam doldurunuz</h2>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    var closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', function() {
        modal.remove();
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });
    }
});