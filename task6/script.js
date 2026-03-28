
const container = document.querySelector(".container");


const item = document.querySelectorAll(".item");

item.forEach((item)=>{
    item.addEventListener("dragstart",()=>{
        item.classList.add("dragging")

        
    })

    item.addEventListener("dragend",()=>{
        item.classList.remove("dragging");
    })
})

const reorderList = (e) =>{

    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const remainingElement = [...container.querySelectorAll(".item:not(.dragging)")]

    const nextElement = remainingElement.find(item =>{
        return e.pageY <= item.offsetTop + (item.offsetHeight/2);
    })

    container.insertBefore(dragging,nextElement);
}


container.addEventListener("dragover",reorderList);
container.addEventListener("dragenter",(e)=>{
    e.preventDefault();
})