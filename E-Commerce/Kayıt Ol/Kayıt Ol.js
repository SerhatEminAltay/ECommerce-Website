document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var firstName = document.getElementById('first_name').value;
    var lastName = document.getElementById('last_name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var message = document.getElementById('message');

    if (password !== confirmPassword) {
      message.textContent = 'Şifreler eşleşmiyor!';
      message.style.color = 'red';
      return;
    }

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('phone', phone);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    message.textContent = 'Kayıt başarılı! Giriş yapabilirsiniz.';
    message.style.color = 'green';
    setTimeout(function() {
      window.location.href = '../Giriş/Giriş.html';
    }, 2000);
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