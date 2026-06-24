let cart = [];

function renderProducts(list = products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" />
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <b>${p.price} грн</b>
        <button onclick="addToCart(${p.id})">Додати в кошик</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  document.getElementById("cartCount").innerText = cart.length;
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function renderCart() {
  const box = document.getElementById("cartItems");
  box.innerHTML = "";

  cart.forEach(p => {
    box.innerHTML += `<p>${p.name} - ${p.price} грн</p>`;
  });
}

function sendOrder() {
  const phone = document.getElementById("phone").value;

  if (!phone) {
    alert("Введіть номер телефону!");
    return;
  }

  let text = "🧸 Замовлення Happy Kids:%0A";

  cart.forEach(p => {
    text += `${p.name} - ${p.price} грн%0A`;
  });

  text += `%0A📱 Телефон: ${phone}`;

  window.open(`viber://chat?number=%2B380661475555&text=${text}`);

  alert("Заявку надіслано!");
  cart = [];
  document.getElementById("cartCount").innerText = 0;
  closeCart();
}

document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(value)));
});

renderProducts();
