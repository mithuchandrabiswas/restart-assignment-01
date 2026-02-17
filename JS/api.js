
const BASE_URL = "https://fakestoreapi.com";

// All Products
async function fetchAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return await res.json();
}

// All Categories
async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return await res.json();
}

// Products by Category
async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  return await res.json();
}

// Single Product
async function fetchSingleProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return await res.json();
}
