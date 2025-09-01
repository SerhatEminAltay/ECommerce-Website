document.addEventListener('DOMContentLoaded', function() {
    var firstName = localStorage.getItem('firstName');
    var lastName = localStorage.getItem('lastName');
    var phone = localStorage.getItem('phone');
    var email = localStorage.getItem('email');

    if (firstName) document.getElementById('first_name').value = firstName;
    if (lastName) document.getElementById('last_name').value = lastName;
    if (phone) document.getElementById('phone').value = phone;
    if (email) document.getElementById('email').value = email;

    document.getElementById('accountForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var firstName = document.getElementById('first_name').value;
        var lastName = document.getElementById('last_name').value;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message');

        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);

        message.textContent = 'Bilgiler güncellendi!';
        message.style.color = 'green';
    });

    var accountLink = document.getElementById('account-link');
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        accountLink.href = '../Hesabım/Hesabım.html';
    } else {
        accountLink.href = '../Giriş/Giriş.html';
    }
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
