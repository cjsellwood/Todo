import { sidebarModule } from './sidebar.js';

sidebarModule.startSidebar();

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

// Hide form for new todo
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
        
        // Save todo object to todo array in local storage
        let todoArray = getTodoFromStorage();


        // Values from new todo form
        const title = document.getElementById("title-input");
        const description = document.getElementById("description-input");
        const dueDate = document.getElementById("date-input");
        const priority = document.getElementById("priority-input");

        // Allow no description and default priority as low
        if (title.value === "") {
            title.style.borderBottom = "2px solid red";
            title.setAttribute("placeholder", "Title Required");

        } else if (dueDate.value === "") {
            dueDate.style.borderBottom = "2px solid red";
            dueDate.setAttribute("placeholder", "Date Required");
            title.style.borderBottom = "2px solid black";
        } else {
            // Format date
            let date = new Date(dueDate.value);
            const months = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul",
                            "Aug", "Sep", "Oct", "Nov", "Dec"];

            let formattedDate = `${date.getDate()} ${months[date.getMonth()]}` +
                            ` ${date.getFullYear()}`;

            // Assign random color to individual todo
            let color = `hsl(${Math.random() * 360}, 100%, 85%)`;

            // Create new todo
            const newTodo = todoFactory(title.value, description.value,
                 formattedDate, color, priority.value, 
                 sidebarModule.getCurrentProject())
    
            // Reset forms
            title.value = "";
            description.value = "";
            dueDate.value = "";
            const priorityDefault = document.getElementById("select-default");
            priorityDefault.selected = "Low";

            todoArray.push(newTodo);
            addTodoToStorage(todoArray);
    
            closeNewTodo();
            render();
        }

    })
}

submitNewTodo();

// Store projects in local storage
function addTodoToStorage(array) {
    window.localStorage.setItem('todo', JSON.stringify(array));
}

// Retrieve projects from local storage
function getTodoFromStorage() {
    return JSON.parse(window.localStorage.getItem('todo'));
}


// Stop selection of dates before today
function setMinDate() {
    const dateInput = document.getElementById("date-input");
    const date = new Date();
    let formattedDate = date.toISOString().split('T')[0];
    dateInput.setAttribute("min", formattedDate);
}

// Render todo items in grid
function render() {
    const container = document.getElementById("container");
    clearCurrentTodo(container);
    let project = sidebarModule.getCurrentProject();
    const todoArray = getTodoFromStorage();
    
    // Create blank list if doesn't exist yet 
    if (todoArray === null) {
        todoArray = [];
        addTodoToStorage(todoArray);
    }

    todoArray.forEach(element => {
        // Display all todo items
        if (project === "All") {
            const todo = createTodoDiv(element);
            container.appendChild(todo);
        } else {
            // Display only todo items with selected project
            if (element.project === project) {
                const todo = createTodoDiv(element);
                container.appendChild(todo);
            }
        }
    })
}

// Create div element with todo details inside
function createTodoDiv(element) {
    const todo = document.createElement("div");

    const todoTitle = document.createElement("h4");
    todoTitle.textContent = element.title;
    todo.appendChild(todoTitle);

    const todoDescription = document.createElement("p");
    todoDescription.textContent = element.description;
    todo.appendChild(todoDescription);

    const todoDate = document.createElement("p");
    todoDate.textContent = element.dueDate;
    todo.appendChild(todoDate);

    const todoPriority = document.createElement("p");
    todoPriority.textContent = element.priority;
    todo.appendChild(todoPriority);

    todo.style.backgroundColor = element.color;
    todo.classList.add("grid-item");
    return todo;
}

render();

function clearCurrentTodo(parent) {
    parent.querySelectorAll("*").forEach(element => element.remove());
}







// Create todo object with factory function 
// Need title, description, dueDate, priority
const todoFactory = (title, description, dueDate, color, priority, project) => {
    return { title, description, dueDate, color, priority, project };
}

export { render }