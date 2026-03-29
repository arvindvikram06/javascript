const content = document.getElementById("content");
const loader = document.getElementById("loader");

let page = 1;
let isLoading = false;


async function fetchData() {
    if (isLoading) return;

    isLoading = true;
    loader.style.display = "block";

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
        );
        const data = await response.json();
        appendData(data);
        page++;
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    loader.style.display = "none";
    isLoading = false;
}


function appendData(items) {
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    `;
        content.appendChild(div);
    });
}


window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchData();
    }
});

fetchData();