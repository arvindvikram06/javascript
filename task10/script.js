let products = [];

async function fetchProducts() {
    try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        products = data.products;

        if (document.getElementById("product-list")) {
            renderProducts(products);
        }

    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

function renderProducts(productArray) {
    const product_sec = document.getElementById("product-list");
    if (!product_sec) return;

    product_sec.innerHTML = "";

    productArray.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");

        div.innerHTML = `
            <img src="${product.thumbnail}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="goToProduct(${product.id})">View</button>
        `;

        product_sec.appendChild(div);
    });
}

function setupSearch() {
    const searchInput = document.querySelector(".search");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(value)
        );

        renderProducts(filtered);
    });
}

function setupFilter() {
    const select = document.querySelector("select");
    if (!select) return;

    select.addEventListener("change", (e) => {
        const category = e.target.value.toLowerCase();

        if (category === "all categories") {
            renderProducts(products);
        } else {
            const filtered = products.filter(p =>
                p.category.toLowerCase().includes(category)
            );
            renderProducts(filtered);
        }
    });
}

function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

fetchProducts();
setupSearch();
setupFilter();
