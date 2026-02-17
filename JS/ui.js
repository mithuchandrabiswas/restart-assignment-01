
// -----Loading------
function showLoader() {
  document.getElementById("productGrid").innerHTML = "<h3>Loading...</h3>";
}


// -----Categories Fetching------
function renderCategories(categories) {
  const container = document.getElementById("categoryContainer");
  container.innerHTML = `<button class="active" data-category="all">All</button>`;

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.innerText = category;
    btn.dataset.category = category;
    container.appendChild(btn);
  });
}

// -----All Products Fetching------
const grid = document.getElementById("productGrid");

function renderProducts(products) {
  if (!Array.isArray(products)) return;

  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title.slice(0, 30)}...</h3>
      <p><strong>$${product.price}</strong></p>
      <span>${product.category}</span>
      <p>⭐ ${product.rating.rate}</p>
      <button class="details-btn">Details</button>
      <button class="add-cart-btn">Add to Cart</button>
    `;

    // Add to Cart click
    card.querySelector(".add-cart-btn").addEventListener("click", () => {
      addToCart(product);
    });

    grid.appendChild(card);
  });
}

// Cart array globally
let cart = [];

// Load from localStorage if exists
function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) cart = JSON.parse(saved);
  updateCartCount();
}

// Save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to Cart
function addToCart(product) {
  const exists = cart.find(item => item.id === product.id);
  if (!exists) {
    cart.push({ ...product, quantity: 1 });
  } else {
    exists.quantity += 1;
  }

  updateCartCount();
  saveCart();
  console.log("Cart Items:", cart);
}

// Update Navbar Cart Count
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Load cart at start
loadCart();






// Open Cart Modal
const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItemsDiv = document.getElementById("cartItems");
const totalPriceSpan = document.getElementById("totalPrice");

cartIcon.addEventListener("click", () => {
  renderCartModal();
  cartModal.classList.remove("hidden");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Render Cart Items
function renderCartModal() {
  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div>
        <h4>${item.title.slice(0, 20)}...</h4>
        <p>$${item.price} x ${item.quantity}</p>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartItemsDiv.appendChild(div);
  });

  totalPriceSpan.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  saveCart();
  renderCartModal();
}








// Modal Elements
const detailsModal = document.createElement("div");
detailsModal.id = "detailsModal";
detailsModal.className = "modal hidden";
document.body.appendChild(detailsModal);

function openDetailsModal(product) {
  detailsModal.innerHTML = `
    <div class="modal-content">
      <span id="closeDetails" class="close-btn">&times;</span>
      <img src="${product.image}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p><strong>Price: $${product.price}</strong></p>
      <p>⭐ ${product.rating.rate} (${product.rating.count} reviews)</p>
      <button id="buyNowBtn">Buy Now</button>
      <button id="addCartModalBtn">Add to Cart</button>
    </div>
  `;
  detailsModal.classList.remove("hidden");

  // Close modal
  document.getElementById("closeDetails").addEventListener("click", () => {
    detailsModal.classList.add("hidden");
  });

  // Add to Cart from modal
  document.getElementById("addCartModalBtn").addEventListener("click", () => {
    addToCart(product);
    detailsModal.classList.add("hidden");
  });

  // Buy Now (optional)
  document.getElementById("buyNowBtn").addEventListener("click", () => {
    alert("Redirect to checkout for " + product.title);
  });
}




