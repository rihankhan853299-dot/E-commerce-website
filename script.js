// 1. PRODUCTS DATA in ARRAY Formate (Men, Women, Makeup Products)

const products = [
    { 
        id: 1, 
        name: "Premium Denim Jacket", 
        category: "men", 
        price: "1,299", 
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500",
        description: "100% pure denim cotton jacket with a modern slim-fit look, perfect for casual outings." 
    },
    { 
        id: 2, 
        name: "Slim Fit Casual Shirt", 
        category: "men", 
        price: "799", 
        img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500",
        description: "Breathable and lightweight cotton shirt. Tailored fit designed for maximum comfort." 
    },
    { 
        id: 3, 
        name: "Elegant Floral Dress", 
        category: "women", 
        price: "1,899", 
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
        description: "Beautiful georgette floral dress with a flared hem line. Ideal for summer parties." 
    },
    { 
        id: 4, 
        name: "Traditional Silk Saree", 
        category: "women", 
        price: "4,500", 
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
        description: "Authentic Banarasi silk saree with intricate golden zari work and rich border." 
    },
    { 
        id: 5, 
        name: "Matte Liquid Lipstick",  
        category: "makeup", 
        price: "499", 
        img: " https://rukminim2.flixcart.com/image/480/640/xif0q/lipstick/0/b/s/4-power-stay-long-last-matte-lipstick-waterproof-12-hrs-stay-original-imags9zqzdatvzcx.jpeg?q=90 ",
        description: "Long-lasting, smudge-proof matte liquid lipstick that keeps your lips hydrated for 12 hours." 
    },
    { 
        id: 6, 
        name: "HD Foundation Base", 
        category: "makeup", 
        price: "999", 
        img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
        description: "Flawless full-coverage foundation with a natural glowing finish. Suitable for all skin types." 
    }
];


// DOM Elements Selectors
const productGrid = document.getElementById('productGrid');
const searchBar = document.getElementById('searchBar');
const themeToggle = document.getElementById('themeToggle');
const orderModal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const checkoutForm = document.getElementById('checkoutForm');

// --- 2. FUNCTION: PRODUCTS DISPLAY KARNA ---

function displayProducts(filteredProducts) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Pehle se maujood products saaf karein

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Yahan dhyan se dekhiye: title ke neeche <p class="product-desc"> joda hai
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <div>
                    <span class="product-tag">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p> 
                </div>
                <div>
                    <div class="product-price">₹${product.price}</div>
                    <button class="btn-buy" onclick="openModal('${product.name}')">Buy Now</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}


// Initial Loading: Jab page khule toh saare products dikhein
displayProducts(products);


// --- 3. FILTER BY CATEGORY LOGIC ---
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Active styling change karein
        document.querySelector('.category-btn.active').classList.remove('active');
        button.classList.add('active');

        const categoryId = button.id; // 'all-btn', 'men-btn' etc.
        
        if(categoryId === 'all-btn') {
            displayProducts(products);
        } else {
            // ID se check karein kaunsi category hai ('men-btn' -> 'men')
            const selectedCategory = categoryId.replace('-btn', '');
            const filtered = products.filter(p => p.category === selectedCategory);
            displayProducts(filtered);
        }
    });
});


// --- 4. LIVE SEARCH BAR FUNCTIONALITY ---
searchBar.addEventListener('input', (e) => {
    const searchWord = e.target.value.toLowerCase().trim();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchWord));
    displayProducts(filtered);
});


// --- 5. DARK / LIGHT MODE LOGIC ---
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if(isDark) {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerText = "🌙 Dark Mode";
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerText = "☀️ Light Mode";
    }
});


// --- 6. POPUP MODAL CONTROL FUNCTIONS ---
function openModal(productName) {
    document.getElementById('formProductName').value = productName;
    document.getElementById('displayProductName').value = productName;
    orderModal.classList.add('active'); // active class se modal dikhne lagega
}

function closeModal() {
    orderModal.classList.remove('active');
    checkoutForm.reset(); // Form clear karna band hote waqt
}

closeModalBtn.addEventListener('click', closeModal);


// --- 7. FORM SUBMISSION (Frontend side check) ---
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Default submit refresh ko rokne ke liye

    // Yeh data abhi temporary console me dikhega, baad me ise hum API se backend bhejenge
    const orderDetails = {
        productName: document.getElementById('formProductName').value,
        customerName: document.getElementById('custName').value,
        mobileNumber: document.getElementById('custPhone').value,
        address: document.getElementById('custAddress').value,
        city: document.getElementById('custCity').value,
        pinCode: document.getElementById('custPin').value
    };

    console.log("Order Data Collected (Ready for Backend):", orderDetails);
    
    alert(`🎉 Order Placed Successfully for ${orderDetails.productName}!\nThank you, ${orderDetails.customerName}.`);
    closeModal();
});

// =============================================================
// --- NAYA CODE: HAMBURGER MENU SIDE DRAWER LOGIC ---
// (Purana code upar wese hi rahega, yeh bas sabse neeche jodna hai)
// =============================================================
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinksMenu = document.getElementById('navLinksMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

// Hamburger par click karne par drawer khulega
if(hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        navLinksMenu.classList.add('active');
    });
}

// Cross (×) button par click karne par drawer band hoga
if(closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
    });
}

// Mobile me kisi category par click karte hi drawer apne aap band ho jaye
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinksMenu.classList.remove('active');
        }
    });
});


// croser code 

// =============================================================
// --- NAYA CODE: AUTOMATIC IMAGE CAROUSEL LOGIC ---
// =============================================================
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Agar index slides se zyada ho jaye toh pehli slide par le jao
    if (index >= slides.length) currentSlideIndex = 0;
    // Agar index minus me chala jaye toh aakhiri slide par le jao
    if (index < 0) currentSlideIndex = slides.length - 1;

    // Pehle sabhi slides se active class hatao
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Sirf current slide aur dot ko active karo
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Automatic chalne ke liye timer (Every 4 seconds badlegi image)
let slideTimer = setInterval(() => {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}, 4000);

// Agar user dots par click karke change karna chahe
function currentSlide(index) {
    clearInterval(slideTimer); // Timer reset karein taaki click karte hi turant na badle
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
    
    // Timer ko firse shuru karein
    slideTimer = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 4000);
}

// Shop Now Scroll trigger (Purana function agar replace ho gaya ho toh safe-side ke liye)
function scrollToProducts() {
    const pGrid = document.getElementById('productGrid');
    if(pGrid) {
        pGrid.scrollIntoView({ behavior: 'smooth' });
    }
}
