import { sidebarModule } from './sidebar.js';

// Create todo object with factory function 
// Need title, description, dueDate, priority
const todoFactory = (title, description, dueDate, color, priority, project) => {
    return { title, description, dueDate, color, priority, project };
}


sidebarModule.startSidebar();

// Allow adding new todo when pressing button
function newTodo() {
    const newTodoBtn = document.getElementById("new-todo");

    const dateInput = document.getElementById("date-input");
    setMinDate(dateInput);

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

        // Create blank list if doesn't exist yet 
        if (todoArray === null) {
            todoArray = [];
            addTodoToStorage(todoArray);
        }

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
function setMinDate(dateInput) {
    const date = new Date();
    let formattedDate = date.toISOString().split('T')[0];
    dateInput.setAttribute("min", formattedDate);
}

// Render todo items in grid
function render() {
    const container = document.getElementById("container");
    clearCurrentTodo(container);
    let project = sidebarModule.getCurrentProject();
    let todoArray = getTodoFromStorage();
    
    // Create blank list if doesn't exist yet 
    if (todoArray === null) {
        todoArray = [];
        addTodoToStorage(todoArray);
    }

    todoArray.forEach((element, i) => {
        // Display all todo items
        if (project === "All") {
            const todo = createTodoDiv(element, i);
            container.appendChild(todo);
        } else {
            // Display only todo items with selected project
            if (element.project === project) {
                const todo = createTodoDiv(element, i);
                container.appendChild(todo);
            }
        }
    })
}

// Delete todo from both storage and display
function addDeleteTodo(deleteBtn, todo) {
    deleteBtn.addEventListener("click", () => {
        // Remove todo from display
        console.log(todo);
        todo.remove();

        // Delete corresponding projects from array with the index from todo
        const index = todo.getAttribute("data-index");
        console.log(index);

        let projects = getTodoFromStorage();
        projects.splice(index, 1);
        addTodoToStorage(projects);
    })
}

// Edit todo in storage and display
function addEditTodo(editBtn, todo) {
    editBtn.addEventListener("click", () => {
        // Clear all nodes from todo item
        todo.querySelectorAll("*").forEach(element => element.remove());

        const index = todo.getAttribute("data-index");
        let todoArray = getTodoFromStorage();

        // Create form layout with values already filled in
        const editForm = document.createElement("form");
        editForm.classList.add("edit-todo-form");
        editForm.setAttribute("data-index", "index");

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        editForm.appendChild(titleLabel);
        editForm.appendChild(document.createElement("br"));

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.value = todoArray[index].title;
        editForm.appendChild(titleInput);
        editForm.appendChild(document.createElement("br"));

        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description";
        editForm.appendChild(descriptionLabel);
        editForm.appendChild(document.createElement("br"));

        const descriptionInput = document.createElement("textarea");
        descriptionInput.textContent = todoArray[index].description;
        editForm.appendChild(document.createElement("br"));

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Due Date";
        editForm.appendChild(document.createElement("br"));

        // Set date by first formatting
        const dateInput = document.createElement("input");
        let formattedDate = new Date(todoArray[index].dueDate);
        let dates = formattedDate.toLocaleDateString().split("/");
        dateInput.defaultValue = `${dates[2]}-${dates[1]}-${dates[0]}`;
        setMinDate(dateInput);
        dateInput.setAttribute("type", "date");
        editForm.appendChild(dateInput);
        editForm.appendChild(document.createElement("br"));

        const priorityLabel = document.createElement("label");
        priorityLabel.textContent = "Label";
        editForm.appendChild(priorityLabel);
        editForm.appendChild(document.createElement("br"));

        const select = document.createElement("select");

        const optionLow = document.createElement("option");
        optionLow.setAttribute("value", "Low");
        optionLow.textContent = "Low";
        select.appendChild(optionLow);

        const optionMedium = document.createElement("option");
        optionMedium.setAttribute("value", "Medium");
        optionMedium.textContent = "Medium";
        if (todoArray[index].priority === "Medium") {
            optionMedium.setAttribute("selected", "selected");
        }
        select.appendChild(optionMedium);

        const optionHigh = document.createElement("option");
        optionHigh.setAttribute("value", "High");
        optionHigh.textContent = "High";
        if (todoArray[index].priority === "High") {
            optionHigh.setAttribute("selected", "selected");
        }
        select.appendChild(optionHigh);

        editForm.appendChild(select);
        editForm.appendChild(document.createElement("br"));

        const submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "button");
        submitBtn.textContent = "Submit";
        editForm.appendChild(submitBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.textContent = "Cancel";
        editForm.appendChild(cancelBtn);

        todo.appendChild(editForm);

    })
}

// Create div element with todo details inside
function createTodoDiv(element, i) {
    const todo = document.createElement("div");
    todo.setAttribute("data-index", i);

    const todoTitle = document.createElement("h4");
    todoTitle.textContent = element.title;
    todoTitle.classList.add("todo-title");
    todo.appendChild(todoTitle);

    const todoDate = document.createElement("p");
    todoDate.textContent = element.dueDate;
    todoDate.classList.add("todo-date");
    todo.appendChild(todoDate);

    const todoDescription = document.createElement("p");
    todoDescription.textContent = element.description;
    todoDescription.classList.add("todo-description")
    todo.appendChild(todoDescription);

    const todoPriority = document.createElement("p");
    // todoPriority.textContent = element.priority;
    todoPriority.classList.add("todo-priority");
    todo.appendChild(todoPriority);

    // Set top border color based on priority
    if (element.priority === "Low") {
        todo.style.borderTop = "8px solid #00c220";
    } else if (element.priority === "Medium") {
        todo.style.borderTop = "8px solid #fce803";
    } else {
        todo.style.borderTop = "8px solid red";
    }

    const buttons = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-button");
    buttons.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.setAttribute("title", "Delete");

    // Make edit and delete button functional
    addEditTodo(editBtn, todo);
    addDeleteTodo(deleteBtn, todo);


    buttons.appendChild(deleteBtn);
    todo.appendChild(buttons);

    todo.style.backgroundColor = element.color;
    todo.classList.add("grid-item");
    return todo;
}

render();

function clearCurrentTodo(parent) {
    parent.querySelectorAll("*").forEach(element => element.remove());
}








export { render }