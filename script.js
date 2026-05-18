// ===== PRODUCTS DATA =====
const productsData = [
  {
    id: 1,
    name: "Elyndra SPF 50 PA++++ Sun Cream (50g)",
    description: "Lightweight & Non-Greasy Protection",
    price: 365,
    originalPrice: 486,
    discount: 25,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
    category: "sun-protection",
    featured: false
  },
  {
    id: 2,
    name: "Elyndra Vitamin C Face Serum with Hyaluronic Acid (30ml)",
    description: "Brightening & Anti-Aging",
    price: 499,
    originalPrice: 665,
    discount: 25,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    category: "brightening",
    featured: true
  },
  {
    id: 3,
    name: "Elyndra SPF 50 PA++++ Sunscreen (100g)",
    description: "Lightweight & Non-Greasy Sun Protection",
    price: 549,
    originalPrice: 732,
    discount: 25,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
    category: "sun-protection",
    featured: false
  },
  {
    id: 4,
    name: "Elyndra Retinol 2% Face Cream",
    description: "Anti-Aging & Wrinkle Repair Night Cream",
    price: 699,
    originalPrice: 932,
    discount: 25,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400",
    category: "anti-aging",
    featured: true
  },
  {
    id: 5,
    name: "Elyndra Green Tea Face Cleanser",
    description: "Oil Control & Gentle Hydration",
    price: 269,
    originalPrice: 359,
    discount: 25,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400",
    category: "oil-control",
    featured: true
  },
  {
    id: 6,
    name: "Elyndra Niacinamide Face Serum with Hyaluronic Acid (30ml)",
    description: "Pore Minimizing & Brightening",
    price: 499,
    originalPrice: 665,
    discount: 25,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400",
    category: "pore-minimizing",
    featured: true
  }
];

// ===== CART MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('elyndraCart')) || [];
let currentUser = JSON.parse(localStorage.getItem('elyndraUser')) || null;

// Update cart count on page load
updateCartCount();
updateUserInterface();

// ===== NAVBAR FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
  closeCart();
  closeProfile();
});

// Mobile dropdown functionality
document.querySelectorAll('.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle('active');
    }
  });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (!link.classList.contains('dropdown-toggle')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
});

// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);
}

document.getElementById('nextSlide').addEventListener('click', nextSlide);
document.getElementById('prevSlide').addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// ===== LOAD PRODUCTS =====
function loadProducts() {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = '';

  productsData.forEach(product => {
    const productCard = `
      <article class="product-card" itemscope itemtype="https://schema.org/Product">
        <div class="product-image">
          <span class="sale-badge">Sale</span>
          <img src="${product.image}" alt="${product.name}" itemprop="image"/>
          <div class="product-overlay">
            <button class="btn-cart" onclick="addToCart(${product.id})" aria-label="Add to cart">
              <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
            <button class="btn-quick" aria-label="Quick view"><i class="fas fa-eye"></i></button>
            <button class="btn-wish" aria-label="Add to wishlist"><i class="fas fa-heart"></i></button>
          </div>
        </div>
        <div class="product-info">
          <h3 itemprop="name">${product.name}</h3>
          <p class="product-desc" itemprop="description">${product.description}</p>
          <div class="product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span class="sale-price" itemprop="price" content="${product.price}">₹${product.price}.00</span>
            <span class="original-price">₹${product.originalPrice}.00</span>
            <span class="discount-tag">${product.discount}% OFF</span>
            <meta itemprop="priceCurrency" content="INR"/>
          </div>
        </div>
      </article>
    `;
    productsGrid.innerHTML += productCard;
  });
}

// ===== LOAD FEATURED PRODUCTS =====
function loadFeaturedProducts() {
  const featuredGrid = document.getElementById('featuredGrid');
  featuredGrid.innerHTML = '';

  const featuredProducts = productsData.filter(p => p.featured);

  featuredProducts.forEach(product => {
    const featuredCard = `
      <article class="featured-card" itemscope itemtype="https://schema.org/Product">
        <div class="featured-image-wrapper">
          <div class="featured-thumbnails">
            <img src="${product.image}" class="thumb active" alt="thumbnail"/>
          </div>
          <div class="featured-main-image">
            <span class="sale-badge">Sale</span>
            <img src="${product.image}" alt="${product.name}" itemprop="image"/>
          </div>
        </div>
        <div class="featured-info">
          <h3 itemprop="name">${product.name}</h3>
          <p class="featured-desc" itemprop="description">${product.description}</p>
          <div class="product-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <span class="sale-price" itemprop="price" content="${product.price}">₹${product.price}.00</span>
            <span class="original-price">₹${product.originalPrice}.00</span>
            <meta itemprop="priceCurrency" content="INR"/>
          </div>
          <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </article>
    `;
    featuredGrid.innerHTML += featuredCard;
  });
}

// Load products on page load
loadProducts();
loadFeaturedProducts();

// ===== CART FUNCTIONALITY =====
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const continueShoppingBtn = document.getElementById('continueShopping');

cartIcon.addEventListener('click', (e) => {
  e.preventDefault();
  openCart();
});

closeCartBtn.addEventListener('click', closeCart);
continueShoppingBtn.addEventListener('click', closeCart);

function openCart() {
  cartSidebar.classList.add('active');
  overlay.classList.add('active');
  renderCart();
}

function closeCart() {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
}

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  showToast('Item added to cart!');
  
  // Optional: Open cart sidebar
  // openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
  showToast('Item removed from cart');
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
  updateCartCount();
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    `;
    cartTotalElement.textContent = '₹0.00';
    return;
  }

  let cartHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartHTML += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}"/>
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price}.00</div>
          <div class="cart-item-quantity">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
              <i class="fas fa-minus"></i>
            </button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;
  cartTotalElement.textContent = `₹${total.toFixed(2)}`;
}

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function saveCart() {
  localStorage.setItem('elyndraCart', JSON.stringify(cart));
}

function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  if (!currentUser) {
    showToast('Please login to checkout');
    closeCart();
    openProfile();
    return;
  }

  showToast('Proceeding to checkout...');
  // Implement checkout logic here
}

// ===== PROFILE FUNCTIONALITY =====
const profileIcon = document.getElementById('profileIcon');
const profileSidebar = document.getElementById('profileSidebar');
const closeProfileBtn = document.getElementById('closeProfile');

profileIcon.addEventListener('click', (e) => {
  e.preventDefault();
  openProfile();
});

closeProfileBtn.addEventListener('click', closeProfile);

function openProfile() {
  profileSidebar.classList.add('active');
  overlay.classList.add('active');
}

function closeProfile() {
  profileSidebar.classList.remove('active');
  overlay.classList.remove('active');
}

// Auth tabs switching
document.querySelectorAll('.auth-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.getAttribute('data-tab');
    
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(`${targetTab}Form`).classList.add('active');
  });
});

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Simple validation (in real app, this would be server-side)
  const users = JSON.parse(localStorage.getItem('elyndraUsers')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem('elyndraUser', JSON.stringify(currentUser));
    updateUserInterface();
    showToast(`Welcome back, ${user.name}!`);
    closeProfile();
  } else {
    showToast('Invalid email or password');
  }
}

function handleRegister(e) {
  e.preventDefault();
  
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (password !== confirmPassword) {
    showToast('Passwords do not match!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('elyndraUsers')) || [];
  
  if (users.find(u => u.email === email)) {
    showToast('Email already registered!');
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem('elyndraUsers', JSON.stringify(users));

  currentUser = { name, email };
  localStorage.setItem('elyndraUser', JSON.stringify(currentUser));
  
  updateUserInterface();
  showToast(`Welcome, ${name}!`);
  closeProfile();
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('elyndraUser');
  updateUserInterface();
  showToast('Logged out successfully');
  closeProfile();
}

function updateUserInterface() {
  const authContainer = document.getElementById('authContainer');
  const userProfile = document.getElementById('userProfile');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');

  if (currentUser) {
    authContainer.style.display = 'none';
    userProfile.style.display = 'block';
    userName.textContent = currentUser.name;
    userEmail.textContent = currentUser.email;
  } else {
    authContainer.style.display = 'block';
    userProfile.style.display = 'none';
  }
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  showToast(`Thank you for subscribing with ${email}!`);
  e.target.reset();
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===== FEATURED PRODUCT THUMBNAIL SWITCHING =====
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('thumb')) {
    const thumbnails = e.target.parentElement.querySelectorAll('.thumb');
    const mainImage = e.target.closest('.featured-image-wrapper').querySelector('.featured-main-image img');
    
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    e.target.classList.add('active');
    mainImage.src = e.target.src.replace('w=100', 'w=500');
  }
});

console.log('Elyndra - E-commerce website loaded successfully! 🎉');