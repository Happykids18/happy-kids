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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMRZG834cI1LvLQN2IHEhh2vALyM7lI4U",
  authDomain: "happy-kids-d724b.firebaseapp.com",
  projectId: "happy-kids-d724b",
  storageBucket: "happy-kids-d724b.firebasestorage.app",
  messagingSenderId: "670281220123",
  appId: "1:670281220123:web:80524de58060eb1bc238be",
  measurementId: "G-ZJQ3QH6QDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Инициализация Firebase уже должна быть выше этого кода

// Функция для загрузки товаров
function loadProducts() {
    const db = firebase.firestore();
    const productsContainer = document.getElementById('products');

    db.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <h2>${product.name}</h2>
                <p>Ціна: ${product.price} грн</p>
                <p>${product.desc}</p>
                <img src="${product.img}" alt="${product.name}" width="200">
            `;
            productsContainer.appendChild(div);
        });
    }).catch((error) => {
        console.error('Помилка завантаження товарів:', error);
    });
}

// Запускаем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
