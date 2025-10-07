// ====== NAVBAR MENU ======
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// ====== PRODUCT DATA ======
const products = [
  { id: 1, name: "Men's Leather Watch", category: "men", price: 2499, img: "watch.img" },
  { id: 2, name: "Women's Handbag", category: "women", price: 1799, img: "bag.img" },
  { id: 3, name: "Unisex Sunglasses", category: "unisex", price: 999, img: "glasses.img" },
  { id: 4, name: "Gold-Plated Necklace", category: "women", price: 2999, img: "necklace.img" },
  { id: 5, name: "Leather Belt", category: "men", price: 799, img: "belt.img" },
  { id: 6, name: "Wallet Combo Set", category: "men", price: 1499, img: "wallet.img" },
  { id: 7, name: "Women’s Bracelet", category: "women", price: 1299, img: "bracelet.img" },
  { id: 8, name: "Unisex Smart Watch", category: "unisex", price: 3499, img: "swatch.img" },

  // ➕ Additional Products
  { id: 9, name: "Men’s Sunglasses", category: "men", price: 1199, img: "sunglasses.img" },
  { id: 10, name: "Women’s Earrings", category: "women", price: 899, img: "earrings.img" },
  { id: 11, name: "Women’s Scarf", category: "women", price: 799, img: "scarf.img" },
  { id: 12, name: "Men’s Backpack", category: "men", price: 1599, img: "backpack.img" },
  { id: 13, name: "Unisex Perfume", category: "unisex", price: 1299, img: "perfume.img" },
  { id: 14, name: "Women’s Heels", category: "women", price: 2199, img: "heels.img" },
  { id: 15, name: "Men’s Casual Shoes", category: "men", price: 2499, img: "shoes.img" },
  { id: 16, name: "Unisex Beanie Cap", category: "unisex", price: 499, img: "cap.img" },
  { id: 17, name: "Women’s Necklace Set", category: "women", price: 1799, img: "necklace1.img" },
  { id: 18, name: "Men’s Bracelet", category: "men", price: 999, img: "bracelet1.img" },
  { id: 19, name: "Women’s Shoulder Bag", category: "women", price: 1899, img: "shoulderbag.img" },
  { id: 20, name: "Unisex White Sneakers", category: "unisex", price: 2599, img: "sneakers.img" }
];

// ====== INITIAL LOAD ======
window.onload = () => {
  if (document.getElementById("product-list")) loadProducts(products);
  if (document.getElementById("featured-products")) loadFeatured();
  if (document.getElementById("cart-items")) loadCart();
  updateCartCount();
};

// ====== LOAD PRODUCTS ======
function loadProducts(list) {
  const container = document.getElementById("product-list");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = "<p>No matching products found 😔</p>";
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">₹${p.price}</p>
      <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

// ====== FILTER & SEARCH ======
function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const query = document.getElementById("searchBar").value.toLowerCase();

  let filtered = products.filter(p => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  loadProducts(filtered);
}

// ====== FEATURED PRODUCTS ======
function loadFeatured() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  container.innerHTML = products
    .slice(0, 4)
    .map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `)
    .join("");
}

// ====== CART MANAGEMENT ======
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  let cart = getCart();
  let product = products.find(p => p.id === id);
  let existing = cart.find(item => item.id === id);

  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });

  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  let cart = getCart();
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.innerText = cart.reduce((a, b) => a + b.qty, 0);
}

function loadCart() {
  let cart = getCart();
  const container = document.getElementById("cart-items");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.getElementById("total-price").innerText = 0;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="">
      <h3>${item.name}</h3>
      <p>₹${item.price} × ${item.qty}</p>
      <button class="add-btn" onclick="removeItem(${item.id})">Remove</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("total-price").innerText = total;
}

function removeItem(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  loadCart();
}

function checkout() {
  alert("🎉 Thank you for shopping with FashionHub! Your order has been placed.");
  localStorage.removeItem("cart");
  loadCart();
}
