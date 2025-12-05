/* ============================================================
   VOGUEMART FRONTEND CLEAN SCRIPT
   ============================================================ */

/* ---------------- PRODUCT LIST ---------------- */
const PRODUCTS = [
  {
    id: 1,
    name: "Oversized Cotton Blend T-Shirt",
    price: 292,
    category: "Clothes",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTIMAKaQw-2NKByVrwD8w053ekp8bFtC6qWfcbfKlWuq6gf0dIBx0RKcxvek8yxenzHQDldhm5b8timS86eTHaCxmEJ9lpaxZF2mTsUkkaUiWipVi16OyURVg"
  },
  {
    id: 2,
    name: "Women Palazzo Pants",
    price: 499,
    category: "Clothes",
    image:
      "https://myprisma.in/cdn/shop/products/2_82f71496-73fe-4546-9a0b-c5bbe3973b52.jpg"
  },
  {
    id: 3,
    name: "Premium Sneakers",
    price: 2599,
    category: "Shoes",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2024/12/469703376/TD/OD/CO/191798954/dual-colour-vegan-striped-premium-shoes-for-men-500x500.png"
  },
  {
    id: 4,
    name: "Luxury Wrist Watch",
    price: 1799,
    category: "Accessories",
    image:
      "https://i5.walmartimages.com/seo/Poedagar-Top-Brand-Luxury-Men-Watch-Waterproof-Luminous-Stainless-Steel-Watches-Sport-Quartz-Clock-Mens-Date-Business-Wristwatch-Quartz-Wristwatches_9e8f9e27-a565-433d-a631-0217e7658626.5a77011a5e9db0be8848f49f56f7ce28.jpeg"
  }
];

/* ---------------- RENDER PRODUCTS ---------------- */
function renderProducts(list) {
  const container = document.querySelector(".products-container");
  if (!container) return;

  container.innerHTML = list
    .map(
      (p) => `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">Add to Cart</button>
      </div>
    `
    )
    .join("");
}

/* ------------------ CART ------------------ */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let exists = cart.find((x) => x.name === name);

  if (exists) exists.qty++;
  else cart.push({ name, price, image, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart!");
}

/* ------------------ WISHLIST ------------------ */
function addToWishlist(name, price, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let exists = wishlist.find((x) => x.name === name);

  if (!exists) {
    wishlist.push({ name, price, image });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist");
  } else {
    alert("Already in Wishlist");
  }
}

/* ---------------- DARK MODE ---------------- */
document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      toggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggle.textContent = "🌙";
    }
  });

  /* CATEGORY FILTER */
  const chips = document.querySelectorAll(".vm-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("vm-chip-active"));
      chip.classList.add("vm-chip-active");

      const category = chip.textContent.trim();

      if (category === "All") renderProducts(PRODUCTS);
      else renderProducts(PRODUCTS.filter((p) => p.category === category));
    });
  });

  /* MOBILE MENU */
  document.getElementById("menuBtn").onclick = () => {
    document.getElementById("navMenu").classList.toggle("show-menu");
  };
});



