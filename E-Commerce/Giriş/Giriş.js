document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var message = document.getElementById('message');

    var storedEmail = localStorage.getItem('email');
    var storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      message.textContent = 'Giriş başarılı!';
      message.style.color = 'green';
      setTimeout(function() {
        window.location.href = '../Anasayfa/anasayfa.html';
      }, 2000);
    } else {
      message.textContent = 'Şifrede veya Girmiş olduğunuz mail adresinizde hata var!';
      message.style.color = 'red';
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
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