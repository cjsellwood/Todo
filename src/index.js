import { sidebar } from './sidebar.js';
import { storage } from './storage.js';
import { helpers } from './helpers.js';

// Submit form button
function submitNewTodo() {
    const submitBtn = document.getElementById("submit-todo");
    submitBtn.addEventListener("click", () => {
        event.stopPropagation();
        
        // Save todo object to todo array in local storage
        let todoArray = storage.getFromStorage('todo');

        // Values from new todo form
        const title = document.getElementById("title-input");
        const description = document.getElementById("description-input");
        const dueDate = document.getElementById("date-input");
        const priority = document.getElementById("priority-input");

        // Allow no description and default priority as low
        if (title.value === "") {
            title.style.border = "1px solid red";
            title.setAttribute("placeholder", "Title Required");
            dueDate.style.border = "1px solid white";

        } else if (dueDate.value === "") {
            dueDate.style.border = "1px solid red";
            title.style.border = "1px solid white";
        } else {
            // Format date
            const formattedDate = helpers.formatDate(dueDate);

            // Assign random color to individual todo
            let color = `hsl(${Math.random() * 360}, 100%, 85%)`;

            // Create new todo
            const newTodo = todoFactory(title.value, description.value,
                 formattedDate, color, priority.value, 
                 sidebar.getCurrentProject());
    
            // Reset forms
            title.value = "";
            description.value = "";
            dueDate.value = "";
            const priorityDefault = document.getElementById("select-default");
            priorityDefault.selected = "Low";

            todoArray.push(newTodo);
            storage.addToStorage(todoArray, 'todo');
    
            helpers.closeNewTodo();
            render();
        }
    })
}

// Render todo items in grid
function render() {
    const container = document.getElementById("container");
    helpers.clearCurrentTodo(container);
    let project = sidebar.getCurrentProject();
    let todoArray = storage.getFromStorage('todo');
    
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
        todo.remove();

        // Delete corresponding projects from array with the index from todo
        const index = todo.getAttribute("data-index");
        console.log(index);

        let projects = storage.getFromStorage('todo');
        projects.splice(index, 1);
        storage.addToStorage(projects, 'todo');
    })
}

// Edit todo in storage and display
function addEditTodo(editBtn, todo) {
    editBtn.addEventListener("click", () => {
        // Clear all nodes from todo item
        helpers.clearCurrentTodo(todo);

        const index = todo.getAttribute("data-index");
        let todoArray = storage.getFromStorage('todo');

        // Create form layout with values already filled in
        const editForm = document.createElement("form");
        editForm.classList.add("edit-todo-form");
        editForm.setAttribute("data-index", index);

        const titleLabel = document.createElement("label");
        titleLabel.textContent = "Title";
        editForm.appendChild(titleLabel);
        editForm.appendChild(document.createElement("br"));

        const titleInput = document.createElement("input");
        titleInput.classList.add("edit-title");
        titleInput.setAttribute("type", "text");
        titleInput.value = todoArray[index].title;
        editForm.appendChild(titleInput);
        editForm.appendChild(document.createElement("br"));

        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description";
        editForm.appendChild(descriptionLabel);
        editForm.appendChild(document.createElement("br"));

        const descriptionInput = document.createElement("textarea");
        descriptionInput.classList.add("edit-description");
        descriptionInput.textContent = todoArray[index].description;
        editForm.appendChild(descriptionInput);
        editForm.appendChild(document.createElement("br"));

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Due Date";
        editForm.appendChild(dateLabel);
        editForm.appendChild(document.createElement("br"));

        // Set date by first formatting
        const dateInput = document.createElement("input");
        dateInput.classList.add("edit-date");
        let formattedDate = new Date(todoArray[index].dueDate);
        let dates = formattedDate.toLocaleDateString().split("/");
        dateInput.defaultValue = `${dates[2]}-${dates[1]}-${dates[0]}`;
        helpers.setMinDate(dateInput);
        dateInput.setAttribute("type", "date");
        editForm.appendChild(dateInput);
        editForm.appendChild(document.createElement("br"));

        const priorityLabel = document.createElement("label");
        priorityLabel.textContent = "Priority";
        editForm.appendChild(priorityLabel);
        editForm.appendChild(document.createElement("br"));

        const select = document.createElement("select");
        select.classList.add("edit-priority");

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
        submitBtn.classList.add("edit-save");
        submitBtn.textContent = "Save";
        editForm.appendChild(submitBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.classList.add("edit-save");
        cancelBtn.textContent = "Cancel";
        editForm.appendChild(cancelBtn);

        todo.appendChild(editForm);

        // Add cancel button functionality
        cancelBtn.addEventListener("click", () => {
            // Replace todo form with new div
            const replacementTodo = createTodoDiv(todoArray[index], index);
            todo.parentNode.replaceChild(replacementTodo, todo);
        })

        // Add submit button functionality
        submitBtn.addEventListener("click", () => {
            const updatedForm = document.querySelector(`form[data-index="${index}"]`);

            // Update todo with entered values
            const title = updatedForm.querySelector(".edit-title");
            const description = updatedForm.querySelector(".edit-description");
            const dueDate = updatedForm.querySelector(".edit-date");
            const priority = updatedForm.querySelector(".edit-priority");

            // Allow no description and default priority as low
            if (title.value === "") {
                title.style.border = "1px solid red";
                title.setAttribute("placeholder", "Title Required");
                dueDate.style.border = "1px solid black";

            } else if (dueDate.value === "") {
                dueDate.style.border = "1px solid red";
                title.style.border = "1px solid black";
            } else {
                // Format date
                todoArray[index].title = title.value;
                todoArray[index].description = description.value;
                todoArray[index].dueDate = helpers.formatDate(dueDate);
                todoArray[index].priority = priority.value;
                storage.addToStorage(todoArray, 'todo');
    
                // Replace todo form with new div
                const replacementTodo = createTodoDiv(todoArray[index], index);
                todo.parentNode.replaceChild(replacementTodo, todo);
            }
        })
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

// Sort by Priority button
function sortByPriority() {
    const sortBtn = document.getElementById("sort-priority");
    sortBtn.addEventListener("click", () => {
        let array = storage.getFromStorage('todo');
        let newArray = [];
        array.forEach(element => {
            if (element.priority === "High") {
                newArray.push(element);
            }
        })
        array.forEach(element => {
            if (element.priority === "Medium") {
                newArray.push(element);
            }
        })
        array.forEach(element => {
            if (element.priority === "Low") {
                newArray.push(element);
            }
        })

        // If already sorted by priority, sort reverse priority
        if (array.every((val, index) => val === newArray[index])) {
            newArray.reverse();
        }
        
        storage.addToStorage(newArray, 'todo');
        render();
    });
}

// Sort by date button
function sortByDate() {
    const sortBtn = document.getElementById("sort-date");
    sortBtn.addEventListener("click", () => {
        let array = storage.getFromStorage('todo');
        let newArray = [...array];
        newArray.sort(function(a, b) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        })

        // If already sorted by date, sort reverse date
        if (array.every((val, index) => val === newArray[index])) {
            newArray.reverse();
        }
        storage.addToStorage(newArray, 'todo');
        render();
    });
}

// Create todo object with factory function 
const todoFactory = (title, description, dueDate, color, priority, project) => {
    return { title, description, dueDate, color, priority, project };
}

sidebar.startSidebar();
helpers.startHelpers();

submitNewTodo();
render();
sortByPriority();
sortByDate();

export { render }