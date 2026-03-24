
const todoInput = document.getElementById("todo-input");

const addBtn = document.getElementById("add-btn");

const taskList = document.getElementById("task-list");

const updateBtn = document.getElementById("updateBtn");

const popupInput = document.getElementById("popupInput");

const closeBtn = document.getElementById("closeBtn")

const popup = document.getElementById("popup");

let currentIndex = null;


const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

RenderTasks();



function addTask () {
    const text = todoInput.value.trim();
    // console.log(text);

    if(text == ""){
        alert("please enter a task!!")
        return;
    }

    tasks.push({text: text, isCompleted: false});
    saveTask();
    RenderTasks();
    todoInput.value="";
}



function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}


function RenderTasks(){
    taskList.innerHTML = ""
    console.log("in render")
    tasks.forEach((task,index)=>{
        const taskItem = document.createElement("li");
        taskItem.className = `task_item ${task.isCompleted ? "completed" : "pending"}`

       

        const p = document.createElement("p")
        p.innerText = task.text;
        p.addEventListener("click", () => {
            completeTask(index);
        })

        const div = document.createElement("div");

        const updateTaskBtn = document.createElement("button")
        updateTaskBtn.innerText = "update";
        updateTaskBtn.addEventListener("click",()=>{
            updateTask(index);
        })
      

        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "delete"
        deleteBtn.addEventListener("click",()=>{
            deleteTask(index);
        })
        
        
        div.appendChild(updateTaskBtn);
        div.appendChild(deleteBtn);
        
        taskItem.appendChild(p);
        taskItem.appendChild(div)

        taskList.appendChild(taskItem)
    })

}

function completeTask(index) {
    console.log(index)
    tasks[index].isCompleted = !tasks[index].isCompleted;
    saveTask();
    RenderTasks();
}


function deleteTask(index){
        tasks.splice(index,1);
        saveTask();
        RenderTasks();
}   


function updateTask(index){

    popup.style.opacity = "1";
    popup.style.pointerEvents = "auto"

    currentIndex = index; 

    popupInput.value = tasks[index].text;
}

function updateValue(){

     const updatedValue = popupInput.value.trim();
     
     if(updateValue == ""){
        alert("enter something to update the task!!");
        return;
     }

     tasks[currentIndex].text = updatedValue;

     saveTask();

     currentIndex = null;

     RenderTasks();

    popup.style.opacity = "0";
    popup.style.pointerEvents = "none"

}

closeBtn.addEventListener("click", () => {
    popup.style.opacity = "0";
    popup.style.pointerEvents = "none"
    currentIndex = null;
})



addBtn.addEventListener("click",addTask)

updateBtn.addEventListener("click",updateValue);



