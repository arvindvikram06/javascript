let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    alert("added to cart");
}

export function renderCart() {
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
                <div>
                    <button class="dec">-</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="inc">+</button>
                </div>
                <button class="remove">Remove</button>
            </div>
        `;

        div.querySelector(".inc").addEventListener("click", () => {
            updateQuantity(item.id, '+');
        });

        div.querySelector(".dec").addEventListener("click", () => {
            updateQuantity(item.id, '-');
        });

        div.querySelector(".remove").addEventListener("click", () => {
            removeItem(item.id);
        });

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

function updateQuantity(id, action) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (action === '+') item.quantity++;
    if (action === '-') item.quantity--;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }

    saveCart();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

renderCart();