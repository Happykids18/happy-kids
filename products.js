// Инициализация Firebase должна быть выше, чтобы работала Firestore
const db = firebase.firestore();

// Функция загрузки всех товаров на главную страницу
function loadProducts() {
    const productsContainer = document.getElementById('products');

    // Очищаем контейнер перед загрузкой
    productsContainer.innerHTML = '';

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

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
