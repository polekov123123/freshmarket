// Отображение товаров в корзине
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        checkoutBtn.disabled = true;
        return;
    }
    
    cartEmpty.style.display = 'none';
    checkoutBtn.disabled = false;
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price} ₽</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <button class="remove-item">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Добавление обработчиков событий для управления количеством
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });
    
    // Добавление обработчиков событий для удаления товаров
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    updateCartSummary();
}

// Обновление количества товара
function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Обновление итоговой суммы
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal > 2000 ? 0 : 200;
    const total = subtotal + delivery;
    
    document.querySelector('.subtotal').textContent = `${subtotal} ₽`;
    document.querySelector('.delivery').textContent = `${delivery} ₽`;
    document.querySelector('.total-price').textContent = `${total} ₽`;
    document.querySelector('.summary-row:first-child span:last-child').textContent = `Товары (${cart.reduce((total, item) => total + item.quantity, 0)})`;
}

// Оформление заказа
function setupCheckout() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Заказ оформлен! Спасибо за покупку!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        });
    }
}

// Инициализация страницы корзины
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCartItems();
    setupCheckout();
});