// Инициализация Firebase (замени на свои значения)
const firebaseConfig = {
    apiKey: "ТВОЙ_API_KEY",
    authDomain: "ТВОЙ_AUTH_DOMAIN",
    projectId: "ТВОЙ_PROJECT_ID",
    storageBucket: "ТВОЙ_STORAGE_BUCKET",
    messagingSenderId: "ТВОЙ_MESSAGING_SENDER_ID",
    appId: "ТВОЙ_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Функция для добавления товара
function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const desc = document.getElementById('desc').value;
    const img = document.getElementById('img').value;

    if (name && price && img) {
        db.collection('products').add({
            name: name,
            price: parseFloat(price),
            desc: desc,
            img: img
        })
        .then(() => {
            document.getElementById('status').innerText = 'Товар успішно додано!';
            document.getElementById('name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('img').value = '';
        })
        .catch(error => {
            document.getElementById('status').innerText = 'Помилка при додаванні: ' + error;
        });
    } else {
        document.getElementById('status').innerText = 'Заповніть усі поля!';
    }
}
