let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  showLoader();

  // Load Products
  allProducts = await fetchAllProducts();
  renderProducts(allProducts);
  console.log(allProducts)

  // Load Categories
  const categories = await fetchCategories();
  renderCategories(categories);
});

// Category Click Handling
document.getElementById("categoryContainer").addEventListener("click", async (e) => {
  if (e.target.tagName !== "BUTTON") return;

  document
    .querySelectorAll(".category-buttons button")
    .forEach(btn => btn.classList.remove("active"));

  e.target.classList.add("active");

  const category = e.target.dataset.category;
  showLoader();

  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const products = await fetchProductsByCategory(category);
    renderProducts(products);
  }
});



document.addEventListener("DOMContentLoaded", async () => {
  console.log("Main JS Loaded");

  // Fetch all products
  const products = await fetchAllProducts();
  renderProducts(products);

  // Fetch categories (optional, for later filter)
  const categories = await fetchCategories();
  console.log("Categories:", categories);
});

