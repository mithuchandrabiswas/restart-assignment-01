const BASE_URL = "https://fakestoreapi.com";

/* All products */
async function fetchAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();

  console.log("All Products:", data);
  return data; // ✅ array
}

/* Categories */
async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  const data = await res.json();

  console.log("Categories:", data);
  return data; // ✅ array
}

/* Products by category */
async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  const data = await res.json();

  console.log("Category Products:", data);
  return data; // ✅ array
}
