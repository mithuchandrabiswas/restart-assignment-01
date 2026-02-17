
let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  showLoader();

  // Fetch products
  allProducts = await fetchAllProducts();
  renderProducts(allProducts.slice(0, 8));

  // Fetch categories
  const categories = await fetchCategories();
  renderCategories(categories);
});


// Category Filter
document.getElementById("categoryContainer").addEventListener("click", async (e) => {
  if (e.target.tagName !== "BUTTON") return;

  document.querySelectorAll(".category-buttons button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");

  const category = e.target.dataset.category;
  showLoader();

  if (category === "all") renderProducts(allProducts);
  else {
    const products = await fetchProductsByCategory(category);
    renderProducts(products);
  }
});



// Render products & attach Details button
function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title.slice(0, 25)}...</h3>
      <p><strong>$${product.price}</strong></p>
      <span>${product.category}</span>
      <p>⭐ ${product.rating.rate}</p>
      <button class="details-btn" data-id="${product.id}">Details</button>
      <button class="cart-btn">Add to Cart</button>
    `;

    // Add to Cart
    card.querySelector(".cart-btn").addEventListener("click", () => addToCart(product));

    grid.appendChild(card);
  });

  // Details button click
  const detailBtns = document.querySelectorAll(".details-btn");
  detailBtns.forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const product = await fetchSingleProduct(id);
      openDetailsModal(product);
    });
  });
}

