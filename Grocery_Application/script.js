const apiURL = "https://interveiw-mock-api.vercel.app/api/getProducts";
const loadBtn = document.getElementById("loadBtn");
const productList = document.getElementById("productList");
const sortSelect = document.getElementById("sortSelect");
const loader = document.getElementById("loader");
const emptyState = document.getElementById("emptyState");
const centerDiv = document.querySelector(".center");
const productCount = document.getElementById("productCount");

let products = [];

loadBtn.addEventListener("click", async () => {
  loader.classList.remove("hidden");
  emptyState.classList.add("hidden");
  productList.innerHTML = "";

  centerDiv.style.display = "none";

  try {
    const res = await fetch(apiURL);
    const result = await res.json();
    products = result.data;

    if (products.length === 0) {
      emptyState.classList.remove("hidden");
    }

    renderProducts(products);
  } catch (error) {
    alert("Failed to fetch product");
    console.error(error);
  } finally {
    loader.classList.add("hidden");
  }
});

sortSelect.addEventListener("change", () => {
  if (sortSelect.value === "low") {
    products.sort(
      (a, b) =>
        parseFloat(a.product.variants[0].price) -
        parseFloat(b.product.variants[0].price)
    );
  } else if (sortSelect.value === "high") {
    products.sort(
      (a, b) =>
        parseFloat(b.product.variants[0].price) -
        parseFloat(a.product.variants[0].price)
    );
  }
  renderProducts(products);
});

function renderProducts(data) {
  productList.innerHTML = "";
  productCount.textContent = data.length;

  data.forEach(({ product }) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image.src}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>₹${product.variants[0].price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}
