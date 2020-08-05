// Allows opening and closing of sidebar on mobile
function controlSidebar() {
    const openSidebar = document.getElementById("open-sidebar");
    const sidebar = document.getElementById("sidebar");
    openSidebar.addEventListener('click', () => {
        sidebar.style.width = "80vw";
    })
    
    const closeSidebar = document.getElementById("close-sidebar");
    closeSidebar.addEventListener('click', () => {
        sidebar.style.width = "0px";
    })
}

controlSidebar();

// Create todo object with factory function 
// Need title, description, dueDate, priority
const todoFactory = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
}

let shopping = todoFactory("Shopping", "Going to the shops", "04/05/2020", "medium")
console.log(todoFactory)
console.log(shopping)

// Add new project button
function newProject() {
    const newBtn = document.getElementById("new-project");
    newBtn.addEventListener("click", function newProjectClick() {
        // Create div for input and submit button
        const inputDiv = document.createElement("div");
        inputDiv.id = "input-div";
        inputDiv.classList.add("projects-item");

        // Text input box
        projectInput = document.createElement("input");
        projectInput.id = "new-project-input";
        projectInput.setAttribute("type", "text");
        projectInput.setAttribute("placeholder", "Name");
        inputDiv.appendChild(projectInput);

        // Submit button
        projectSubmit = document.createElement("div");
        projectSubmit.id = "new-project-submit";
        inputDiv.appendChild(projectSubmit);

        // Cancel button
        projectCancel = document.createElement("div");
        projectCancel.id = "new-project-cancel";
        inputDiv.appendChild(projectCancel);

        const parent = document.getElementById("projects-list");
        parent.insertBefore(inputDiv, newBtn);
        
        // Remove event listener after first click
        newBtn.removeEventListener('click', newProjectClick);

        saveProject();
    })
}

newProject();

// Save new Project name or cancel input
function saveProject() {
    const projectInput = document.getElementById("new-project-input");
    const projectSubmit = document.getElementById("new-project-submit");

    // Array of already defined projects
    let projectsArray = document.getElementsByClassName("projects-item");
    projectsArray = Array.from(projectsArray).map(x => x.textContent.toLowerCase());

    projectSubmit.addEventListener('click', () => {
        let text = projectInput.value;
        if (text === "") {
            // Indicate that no text entered
            projectInput.style.borderBottom = "2px solid red";

        } else if (projectsArray.indexOf(text.toLowerCase()) !== -1) {
            // Indicate that there is already a project called that
            projectInput.value = "";
            projectInput.style.borderBottom = "2px solid red";
            projectInput.setAttribute("placeholder", "Already Exists");

        } else if (text.length > 20) {
            // Indicate that the project name was too long
            projectInput.value = "";
            projectInput.style.borderBottom = "2px solid red";
            projectInput.setAttribute("placeholder", "Too Long");

        } else {
            const addedProject = document.createElement("div");
            addedProject.classList.add("projects-item");
            addedProject.textContent = text;

            const inputDiv = document.getElementById("input-div");
    
            const parent = document.getElementById("projects-list");
            parent.insertBefore(addedProject, inputDiv);

            // Remove input field after new project added to list
            inputDiv.remove();

            // Allow pressing new project button again
            newProject();
        }
    })

    const projectCancel = document.getElementById("new-project-cancel");
    projectCancel.addEventListener('click', () => {
        // Remove input field
        const inputDiv = document.getElementById("input-div");
        inputDiv.remove();

        // Allow pressing new project button again
        newProject();
    })
}