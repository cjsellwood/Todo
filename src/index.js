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

        const parent = document.getElementById("projects-list");
        parent.insertBefore(inputDiv, newBtn);
        
        // Remove event listener after first click
        newBtn.removeEventListener('click', newProjectClick);

        saveProject();
    })
}

newProject();

// Save new Project name
function saveProject() {
    const projectInput = document.getElementById("new-project-input");
    const projectSubmit = document.getElementById("new-project-submit");
    projectSubmit.addEventListener('click', () => {
        if (projectInput.value === "") {
            projectInput.style.borderBottom = "2px solid red";
            return;
        } else {
            let text = projectInput.value;
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
        


      // On press of check mark
      //// Get data from input
      // Add new div with text from input
      // Remove input div
      // Allow pressing new project button again
    })


}

