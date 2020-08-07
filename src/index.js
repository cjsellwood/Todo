import { sidebarModule } from './sidebar.js';

sidebarModule.startSidebar();
console.log(sidebarModule.getCurrentProject())

// Allow adding new todo when pressing button
function newTodo() {
    const newTodoBtn = document.getElementById("new-todo");
    setMinDate();
    newTodoBtn.addEventListener("click", () => {
        newTodoBtn.style.height = "500px";
        const newTodoText = newTodoBtn.getElementsByTagName("p")[0];
        newTodoText.style.display = "none";

        const newTodoForm = document.getElementById("new-todo-form");
        newTodoForm.style.display = "block";

        console.log(sidebarModule.getCurrentProject())
    })

}

newTodo();

// Cancel new todo form input
function cancelNewTodo() {
    const cancelBtn = document.getElementById("cancel-todo");
    cancelBtn.addEventListener("click", () => {
        event.stopPropagation();
        closeNewTodo();
    })
}

function closeNewTodo() {
    const newTodoBtn = document.getElementById("new-todo");
    newTodoBtn.style.height = "50px";
    const newTodoText = newTodoBtn.getElementsByTagName("p")[0];
    newTodoText.style.display = "block";
    const newTodoForm = document.getElementById("new-todo-form");
    newTodoForm.style.display = "none";
}

cancelNewTodo();

// Submit form button
function submitNewTodo() {
    const submitBtn = document.getElementById("submit-todo");
    submitBtn.addEventListener("click", () => {
        event.stopPropagation();
        closeNewTodo();
    })
}

submitNewTodo();





// Stop selection of dates before today
function setMinDate() {
    const dateInput = document.getElementById("date-input");
    const date = new Date();
    let formattedDate = date.toISOString().split('T')[0];
    dateInput.setAttribute("min", formattedDate);
}












// Create todo object with factory function 
// Need title, description, dueDate, priority
const todoFactory = (title, description, dueDate, priority, project) => {
    return { title, description, dueDate, priority, project };
}

let shopping = todoFactory("Shopping", "Going to the shops", "04/05/2020",
                            "medium", sidebarModule.getCurrentProject());
console.log(todoFactory);
console.log(shopping);
