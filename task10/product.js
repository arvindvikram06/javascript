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



renderProductDetail();