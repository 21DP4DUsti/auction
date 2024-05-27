document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.querySelector('.register-button');
    const registrationPopup = document.querySelector('.registration-popup');
    const closeButton = document.querySelector('.close-button');
    const registerForm = document.querySelector('.popup-content form');
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');

    registerButton.addEventListener('click', function() {
        registrationPopup.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
        registrationPopup.style.display = 'none';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const formData = new FormData(loginForm);
    
        console.log("Form Data:", formData);  // Вывод данных формы в консоль
    
        fetch('login.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            console.log("Server Response:", data);  // Вывод ответа сервера в консоль
    
            if (data === 'Login successful!') {
                const header = document.querySelector('header');
                const userDisplay = document.createElement('div');
                userDisplay.classList.add('user-display');
                userDisplay.textContent = `${formData.get('username')}`;
                header.appendChild(userDisplay);
                
                registrationPopup.style.display = 'none';
            } else {
                alert(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {

    
    const subscribeForm = document.getElementById('subscribeForm');
    const successMessage = document.querySelector('.success-message');

    subscribeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        successMessage.style.display = 'block';
    });
    
    let cart = [];

 
    function addItemToCart(item) {
        cart.push(item);
        updateCartCounter(); 
    }


    function calculateTotalPrice() {
        let totalPrice = 0;
        for (let item of cart) {
            totalPrice += item.price;
        }
        return totalPrice;
    }
    
    const cartButton = document.querySelector('.cart-icon');
    cartButton.addEventListener('click', function() {
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartTable = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

   
    cartModal.style.display = 'block';

   
    cartTable.innerHTML = '<tr><th>Item</th><th>Price</th></tr>';
    for (let item of cart) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${item.name}</td><td>$${item.price.toFixed(2)}</td>`;
        cartTable.appendChild(newRow);
    }

    const totalPrice = calculateTotalPrice();
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
});

    const closeCart = document.querySelector('.close-cart');
    closeCart.addEventListener('click', function() {
        const cartModal = document.querySelector('.cart-modal');
        cartModal.style.display = 'none';
    });


   
    const buyButtons = document.querySelectorAll('.product button');
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = this.parentElement;
        const itemName = product.querySelector('h3').textContent;
        const itemPrice = parseFloat(product.querySelector('p').textContent.slice(0, -1));
        addItemToCart({name: itemName, price: itemPrice});

     
        updateCartCounter();

        alert('Item added to cart!');
    });
});

function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-counter');
    cartCounter.textContent = cart.length;
}
});

document.addEventListener('DOMContentLoaded', function() {
const themeToggleButton = document.getElementById('themeToggle');
const body = document.body;
const elementsToToggle = [
    body, 
    document.querySelector('header'), 
    document.querySelector('footer'), 
    document.querySelector('.newsletter'), 
    ...document.querySelectorAll('.product'), 
    document.querySelector('.popup-content'), 
    document.querySelector('.cart-content'), 
    document.querySelector('.advertisement-content')
];

themeToggleButton.addEventListener('click', function() {
    elementsToToggle.forEach(el => el.classList.toggle('dark-mode'));
    // Сохранение темы в localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Проверка сохраненной темы при загрузке страницы
if (localStorage.getItem('darkMode') === 'enabled') {
    elementsToToggle.forEach(el => el.classList.add('dark-mode'));
}
});
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.sneaker-images img');
    const popup = document.getElementById('sneakerInfoPopup');
    const closeButton = document.querySelector('.close-button');

    images.forEach(image => {
        image.addEventListener('click', function() {
            const sneakerId = this.getAttribute('data-id');
            fetch(`get_sneaker.php?id=${sneakerId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        document.getElementById('sneakerId').textContent = data.sneaker_id;
                        document.getElementById('sneakerName').textContent = data.name;
                        document.getElementById('sneakerBrand').textContent = data.brand;
                        document.getElementById('sneakerModel').textContent = data.model;
                        document.getElementById('sneakerSize').textContent = data.size;
                        document.getElementById('sneakerColor').textContent = data.color;
                        document.getElementById('sneakerReleaseDate').textContent = data.release_date;
                        document.getElementById('sneakerRetailPrice').textContent = `$${data.retail_price}`;
                        document.getElementById('sneakerDescription').textContent = data.description;
                        document.getElementById('sneakerImage').src = data.image_url;
                        popup.style.display = 'block';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.sneaker-info-popup .close-button'); // Находим кнопку закрытия

    closeButton.addEventListener('click', function() { // Добавляем обработчик события клика
        const popup = document.getElementById('sneakerInfoPopup'); // Находим блок описания кроссовка
        popup.style.display = 'none'; // Закрываем блок описания кроссовка при клике на кнопку закрытия
    });
});
