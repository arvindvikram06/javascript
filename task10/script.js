let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

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

function addToCart(id) {
    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    alert("Added to cart!");
}

function renderCart() {
    const cartContainer = document.querySelector(".cart-items");
    const summary = document.querySelector(".cart-summary");

    if (!cartContainer || !summary) return;

    cartContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.thumbnail}">
            <div>
                <h3>${item.title}</h3>
                <p>$${item.price}</p>
                <input type="number" value="${item.quantity}" min="1"
                    onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    summary.innerHTML = `
        <h2>Summary</h2>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax: $${tax.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>
        <button class="checkout-btn">Checkout</button>
    `;
}

function updateQuantity(id, qty) {
    const item = cart.find(i => i.id === id);
    item.quantity = qty;

    saveCart();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

async function renderProductDetail() {
    const container = document.querySelector(".product-detail");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const product = await res.json();

        container.innerHTML = `
            <img src="${product.thumbnail}">
            <div>
                <h1>${product.title}</h1>
                <p class="price">$${product.price}</p>
                <p class="desc">${product.description}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    } catch (err) {
        console.error(err);
    }
}


fetchProducts();
setupSearch();
setupFilter();
renderCart();
renderProductDetail();