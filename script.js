/* ============================================================
   VOGUEMART - FRONTEND SCRIPT (USER SIDE ONLY)
   Cleaned Version — No Admin Logic, No Firebase Mixed Code
   ============================================================ */

/* ---------------- PRODUCT LIST (STATIC FOR SHOP PAGE) ---------------- */
const PRODUCTS = [
  {
    id: 1,
    name: "Oversized Cotton Blend T-Shirt",
    price: 292,
    category: "Men",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTIMAKaQw-2NKByVrwD8w053ekp8bFtC6qWfcbfKlWuq6gf0dIBx0RKcxvek8yxenzHQDldhm5b8timS86eTHaCxmEJ9lpaxZF2mTsUkkaUiWipVi16OyURVg",
  },
  {
    id: 2,
    name: "Women Palazzo Pants",
    price: 499,
    category: "Women",
    image:
      "https://myprisma.in/cdn/shop/products/2_82f71496-73fe-4546-9a0b-c5bbe3973b52.jpg?v=1679139767&width=1100",
  },
  {
    id: 3,
    name: "Men Stretch Formal Pant",
    price: 314,
    category: "Men",
    image: "https://www.subtract.in/cdn/shop/files/Trouser3_9_1080x.jpg?v=1754677668",
  },
  {
    id: 4,
    name: "Girls Maxi Black Dress",
    price: 599,
    category: "Kids",
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/kids-dress/h/4/o/4-5-years-shivani-black-charvi-original-imahaq6ewfvsu59x.jpeg?q=90",
  },
  {
    id: 5,
    name: "Men Hoodie Black",
    price: 699,
    category: "Men",
    image: "https://fastcolors.in/cdn/shop/files/printed_Sweatshirt_hoodies_for_men_Black-BACK.jpg?v=1751898394",
  },
  {
    id: 6,
    name: "Men Kurta Blue",
    price: 650,
    category: "Ethnic",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCoESrZVSx_f3zq38JKuBbuhO02WyLW7M-bw&s",
  },
  {
    id: 7,
    name: "Women Blue Lehanga Set",
    price: 1199,
    category: "Women",
    image:
      "https://nitikagujral.com/cdn/shop/files/4_Custom_106e29b9-072d-41db-b1fe-7a68e51e180c_800x.jpg?v=1736937405",
  },
  {
    id: 8,
    name: "Luxurious Bags",
    price: 9917,
    category: "Accessories",
    image:
      "https://img.businessoffashion.com/resizer/v2/SP4JP7RSCJCVPDRAHFOHJFJKGE.png?auth=fa53af05877fcd5ba1cfd09c6dd10be6f0a80fe1e1219f5dc28458d40de81d59&width=1920&smart=true",
  },
];

/* ---------------- RENDER SHOP PRODUCTS ---------------- */
function renderProducts(list) {
  const container = document.querySelector(".products-container");
  if (!container) return;

  container.innerHTML = list
    .map(
      (item) => `
    <div class="product-card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">₹${item.price}</p>

      <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">
        Add to Cart
      </button>

      <div class="product-buttons">
        <button class="wish-btn" onclick="addToWishlist('${item.name}', ${item.price}, '${item.image}')">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

/* ---------------- CART ---------------- */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added "${name}" to Cart 🛒`);
}

/* ---------------- WISHLIST ---------------- */
function addToWishlist(name, price, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = wishlist.find((item) => item.name === name);

  if (!exists) {
    wishlist.push({ name, price, image });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist ❤️");
  } else {
    alert("Already in Wishlist ❤️");
  }
}

/* ---------------- DARK MODE ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
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
  }

  /* SHOP PAGE AUTO RENDER */
  if (document.querySelector(".products-container")) {
    renderProducts(PRODUCTS);
  }

  /* FILTER BUTTONS */
  const chips = document.querySelectorAll(".vm-chip");
  if (chips.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("vm-chip-active"));
        chip.classList.add("vm-chip-active");

        const category = chip.textContent.trim();
        if (category === "All") {
          renderProducts(PRODUCTS);
        } else {
          const filtered = PRODUCTS.filter((p) => p.category === category);
          renderProducts(filtered);
        }
      });
    });
  }
});

