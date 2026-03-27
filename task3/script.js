const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const closeBtn = document.getElementById("closeBtn");

const images = document.querySelectorAll(".pic");


images.forEach((img) => {
    img.addEventListener("click", () => {
        popupImg.src = img.src;
        popup.classList.add("show");
    });
});


closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
});


popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.remove("show");
    }
});


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        popup.classList.remove("show");
    }
});