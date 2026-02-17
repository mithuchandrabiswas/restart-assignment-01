// ----- Loading -----
function showLoader() {
  document.getElementById("productGrid").innerHTML = "<h3>Loading...</h3>";
}

// ----- Categories -----
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

// ----- Products -----
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

    // ✅ DETAILS BUTTON FIX
    card.querySelector(".details-btn").addEventListener("click", () => {
      openDetailsModal(product);
    });

    // Add to cart
    card.querySelector(".add-cart-btn").addEventListener("click", () => {
      addToCart(product);
    });

    grid.appendChild(card);
  });
}

// ----- Cart -----
let cart = [];

function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) cart = JSON.parse(saved);
  updateCartCount();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const exists = cart.find(item => item.id === product.id);
  if (!exists) {
    cart.push({ ...product, quantity: 1 });
  } else {
    exists.quantity += 1;
  }
  updateCartCount();
  saveCart();
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

loadCart();

// ----- Cart Modal -----
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItemsDiv = document.getElementById("cartItems");
const totalPriceSpan = document.getElementById("totalPrice");

document.querySelector(".cart").addEventListener("click", () => {
  renderCartModal();
  cartModal.classList.remove("hidden");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

function renderCartModal() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" />
      <div>
        <h4>${item.title.slice(0, 20)}...</h4>
        <p>$${item.price} x ${item.quantity}</p>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      renderCartModal();
    });

    cartItemsDiv.appendChild(div);
  });

  totalPriceSpan.textContent = total.toFixed(2);
}

// ----- DETAILS MODAL -----
const detailsModal = document.createElement("div");
detailsModal.id = "detailsModal";
detailsModal.className = "modal hidden";
document.body.appendChild(detailsModal);

function openDetailsModal(product) {
  detailsModal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" id="closeDetails">&times;</span>
      <img src="${product.image}" />
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p><strong>Price: $${product.price}</strong></p>
      <p>⭐ ${product.rating.rate} (${product.rating.count})</p>
      <button id="buyNowBtn">Buy Now</button>
      <button id="addCartModalBtn">Add to Cart</button>
    </div>
  `;

  detailsModal.classList.remove("hidden");

  document.getElementById("closeDetails").onclick = () =>
    detailsModal.classList.add("hidden");

  document.getElementById("addCartModalBtn").onclick = () => {
    addToCart(product);
    detailsModal.classList.add("hidden");
  };

  document.getElementById("buyNowBtn").onclick = () => {
    alert("Proceed to checkout: " + product.title);
  };
}
