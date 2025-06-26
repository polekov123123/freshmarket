// order.js - логика страницы оформления заказа
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalEl = document.querySelector('.subtotal');
    const deliveryEl = document.querySelector('.delivery');
    const totalEl = document.querySelector('.total');
    const checkoutForm = document.getElementById('checkout-form');

    // Отображение товаров в заказе
    function displayOrderItems() {
        if (cart.length === 0) {
            orderItemsContainer.innerHTML = '<p>Ваша корзина пуста</p>';
            return;
        }

        orderItemsContainer.innerHTML = cart.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-price">${item.price} ₽ × ${item.quantity}</div>
                    <div class="order-item-total">${item.price * item.quantity} ₽</div>
                </div>
            </div>
        `).join('');

        updateOrderTotals();
    }

    // Обновление итоговых сумм
    function updateOrderTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = subtotal > 2000 ? 0 : 200;
        const total = subtotal + delivery;

        subtotalEl.textContent = `${subtotal} ₽`;
        deliveryEl.textContent = `${delivery} ₽`;
        totalEl.textContent = `${total} ₽`;
    }

    // Обработка оформления заказа
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const orderData = {
                customer: {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    address: document.getElementById('address').value
                },
                delivery: document.getElementById('delivery-time').value,
                comment: document.getElementById('comment').value,
                payment: document.querySelector('input[name="payment"]:checked').value,
                items: cart,
                total: parseFloat(totalEl.textContent)
            };

            // Здесь можно отправить данные на сервер
            console.log('Order data:', orderData);
            
            // Показываем сообщение об успехе
            alert('Ваш заказ успешно оформлен! Номер заказа: #' + Math.floor(Math.random() * 10000));
            
            // Очищаем корзину
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }

    displayOrderItems();
});