// Инициализация Firebase (вставь свой конфиг)
const firebaseConfig = {
    apiKey: "ВАШ_API_KEY",
    authDomain: "ВАШ_AUTH_DOMAIN",
    projectId: "ВАШ_PROJECT_ID",
    storageBucket: "ВАШ_STORAGE_BUCKET",
    messagingSenderId: "ВАШ_MESSAGING_SENDER_ID",
    appId: "ВАШ_APP_ID"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Функция для завантаження товарів на головну сторінку
function loadProducts() {
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

// Функція для додавання товару з адмінки
function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const desc = document.getElementById('desc').value;
    const img = document.getElementById('img').value;
    const status = document.getElementById('status');

    if (name && price && img) {
        db.collection('products').add({
            name: name,
            price: parseFloat(price),
            desc: desc,
            img: img
        }).then(() => {
            status.innerText = 'Товар успішно додано!';
            document.getElementById('productForm').reset();
        }).catch((error) => {
            status.innerText = 'Помилка при додаванні: ' + error;
        });
    } else {
        status.innerText = 'Будь ласка, заповніть всі поля.';
    }
}

// Завантаження товарів при відкритті сторінки
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
