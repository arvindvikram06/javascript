
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
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


renderCart();