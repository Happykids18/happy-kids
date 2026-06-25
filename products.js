// Эта функция загружает товары, если нужно их показывать отдельно
function loadProductDetails(productId) {
    const db = firebase.firestore();
    db.collection('products').doc(productId).get().then((doc) => {
        if (doc.exists) {
            const product = doc.data();
            const container = document.getElementById('productDetails');
            container.innerHTML = `
                <h2>${product.name}</h2>
                <p>Ціна: ${product.price} грн</p>
                <p>${product.desc}</p>
                <img src="${product.img}" alt="${product.name}" width="300">
            `;
        } else {
            console.error('Товар не знайдено!');
        }
    }).catch((error) => {
        console.error('Помилка завантаження товару:', error);
    });
}

// Вызов функции, если нужно показать один товар (например, при клике по нему)
// loadProductDetails('ID_ТОВАРУ');
