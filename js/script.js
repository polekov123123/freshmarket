// Данные продуктов
const products = [
    {
        id: 1,
        name: "Свежие яблоки",
        price: 120,
        category: "fruits",
        image: "images/products/apples.jpg",
        rating: 4.5,
        description: "Сочные и хрустящие яблоки сорта Гала",
        popular: true
    },
    {
        id: 2,
        name: "Бананы",
        price: 85,
        category: "fruits",
        image: "images/products/bananas.jpg",
        rating: 4.2,
        description: "Сладкие бананы из Эквадора",
        popular: true
    },
    {
        id: 3,
        name: "Апельсины",
        price: 110,
        category: "fruits",
        image: "images/products/oranges.jpg",
        rating: 4.3,
        description: "Сочные апельсины с тонкой кожурой",
        popular: true
    },
    {
        id: 4,
        name: "Помидоры",
        price: 150,
        category: "vegetables",
        image: "images/products/tomatoes.jpg",
        rating: 4.7,
        description: "Свежие помидоры черри",
        popular: true
    },
    {
        id: 5,
        name: "Огурцы",
        price: 90,
        category: "vegetables",
        image: "images/products/cucumbers.jpg",
        rating: 4.4,
        description: "Хрустящие огурцы с грядки",
        popular: true
    },
    {
        id: 6,
        name: "Морковь",
        price: 60,
        category: "vegetables",
        image: "images/products/carrots.jpg",
        rating: 4.1,
        description: "Сладкая молодая морковь",
        popular: false
    },
    {
        id: 7,
        name: "Куриное филе",
        price: 250,
        category: "meat",
        image: "images/products/chicken.jpg",
        rating: 4.8,
        description: "Свежее куриное филе без кожи",
        popular: true
    },
    {
        id: 8,
        name: "Говядина",
        price: 450,
        category: "meat",
        image: "images/products/beef.jpg",
        rating: 4.6,
        description: "Нежная говяжья вырезка",
        popular: false
    },
    {
        id: 9,
        name: "Молоко",
        price: 75,
        category: "dairy",
        image: "images/products/milk.jpg",
        rating: 4.3,
        description: "Свежее молоко 3.2%",
        popular: true
    },
    {
        id: 10,
        name: "Яйца",
        price: 95,
        category: "dairy",
        image: "images/products/eggs.jpg",
        rating: 4.5,
        description: "Яйца куриные отборные",
        popular: true
    },
    {
        id: 11,
        name: "Хлеб",
        price: 50,
        category: "bakery",
        image: "images/products/bread.jpg",
        rating: 4.2,
        description: "Свежий пшеничный хлеб",
        popular: false
    },
    {
        id: 12,
        name: "Булочки",
        price: 35,
        category: "bakery",
        image: "images/products/buns.jpg",
        rating: 4.0,
        description: "Сдобные булочки с маком",
        popular: false
    }
];

// Инициализация корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление счетчика корзины
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Отображение популярных товаров на главной странице
function displayPopularProducts() {
    const popularGrid = document.querySelector('.popular-products .products-grid');
    if (!popularGrid) return;

    const popularProducts = products.filter(product => product.popular).slice(0, 4);
    
    popularGrid.innerHTML = popularProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <button class="add-to-cart">В корзину</button>
            </div>
        </div>
    `).join('');

    // Добавление обработчиков событий для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.product-card').getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Отображение всех товаров на странице продуктов
function displayAllProducts() {
    const productsGrid = document.querySelector('.products-page .products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <button class="add-to-cart">В корзину</button>
            </div>
        </div>
    `).join('');

    // Добавление обработчиков событий для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.product-card').getAttribute('data-id'));
            addToCart(productId);
        });
    });

    // Фильтрация по категориям
    const categoryFilter = document.querySelector('.category-filter select');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const category = this.value;
            filterProducts(category);
        });
    }

    // Поиск продуктов
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            searchProducts(searchTerm);
        });
        
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.toLowerCase();
                searchProducts(searchTerm);
            }
        });
    }
}

// Фильтрация продуктов по категории
function filterProducts(category) {
    const productCards = document.querySelectorAll('.products-page .product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Поиск продуктов
function searchProducts(term) {
    const productCards = document.querySelectorAll('.products-page .product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Показываем уведомление
    showNotification(`${product.name} добавлен в корзину`);
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Переключение мобильного меню
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayPopularProducts();
    displayAllProducts();
    setupMobileMenu();
    
    // Добавление стилей для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
        }
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});