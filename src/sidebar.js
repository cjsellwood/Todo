import { render } from "./index.js"

const sidebarModule = (() => {
    // Allows opening and closing of sidebar on mobile
    function controlSidebar() {
        const openSidebar = document.getElementById("open-sidebar");
        const sidebar = document.getElementById("sidebar");
        const darkened = document.getElementById("darkened");
        openSidebar.addEventListener('click', () => {
            sidebar.style.width = "80vw";
            darkened.style.display = "block";
        })
        
        const closeSidebar = document.getElementById("close-sidebar");
        closeSidebar.addEventListener('click', () => {
            sidebar.style.width = "0px";
            darkened.style.display = "none";
        })
        // Darken other side of sidebar
        darkened.addEventListener('click', () => {
            darkened.style.display = "none";
            sidebar.style.width = "0px";
        })

    }

    // Add starting projects to list
    function addProjects() {
        // Get stored list of projects or set to empty if none exists
        let projects = getProjectsFromStorage();
        if (projects === null) {
            projects = [];
            addProjectsToStorage(projects);
        }
        const projectsList = document.getElementById("projects-list");

        for (let i = 0; i < projects.length; i++) {
            const addedProject = document.createElement("div");
            addedProject.classList.add("projects-item");

            // Project inner text
            const projectText = document.createElement("p");
            projectText.textContent = projects[i];
            projectText.classList.add("project-text");
            addedProject.appendChild(projectText);

            // Delete project button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.setAttribute("title", "Delete");
            addedProject.appendChild(deleteBtn, addedProject);
            
            const newBtn = document.getElementById("new-project");

            projectsList.insertBefore(addedProject, newBtn);

            addDeleteBtn(deleteBtn, addedProject);
        }
        addHighlight()
    }

    // Makes delete project button work
    function addDeleteBtn(btn, parent) {
        btn.addEventListener("click", function newDeleteBtn() {
            event.stopPropagation();
            const removed = parent.getElementsByClassName("project-text")[0].textContent;

            // Remove from local storage
            let projects = getProjectsFromStorage();
            const removedIndex = projects.indexOf(removed);
            projects.splice(removedIndex, 1);
            addProjectsToStorage(projects);

            // If input is open delete it to so that name can be same as deleted
            const inputDiv = document.getElementById("input-div");
            if (inputDiv !== null) {
                inputDiv.remove();
                newProject();
            }

            parent.remove();

            btn.removeEventListener("click", newDeleteBtn);
        })
    }

    // Add new project button
    function newProject() {
        const newBtn = document.getElementById("new-project");
        newBtn.style.cursor = "pointer";
        newBtn.addEventListener("click", function newProjectClick() {
            // Create div for input and submit button
            const inputDiv = document.createElement("div");
            inputDiv.id = "input-div";
            inputDiv.classList.add("projects-item");
            
            // Text input box
            const projectInput = document.createElement("input");
            projectInput.id = "new-project-input";
            projectInput.setAttribute("type", "text");
            projectInput.setAttribute("placeholder", "Name");
            inputDiv.appendChild(projectInput);

            // Submit button
            const projectSubmit = document.createElement("div");
            projectSubmit.id = "new-project-submit";
            projectSubmit.setAttribute("title", "Save");
            inputDiv.appendChild(projectSubmit);
            
            // Cancel button
            const projectCancel = document.createElement("div");
            projectCancel.id = "new-project-cancel";
            projectCancel.setAttribute("title", "Cancel");
            inputDiv.appendChild(projectCancel);
            
            const parent = document.getElementById("projects-list");
            parent.insertBefore(inputDiv, newBtn);
            
            // Remove event listener after first click
            newBtn.removeEventListener('click', newProjectClick);
            
            // Enables saving of input
            saveProject();

            // Change cursor on new project button
            newBtn.style.cursor = "auto";
        })
    }

    // Save new Project name or cancel input
    function saveProject() {
        const projectInput = document.getElementById("new-project-input");
        const projectSubmit = document.getElementById("new-project-submit");
        
        // Array of already defined projects
        let projectsArray = document.getElementsByClassName("project-text");
        projectsArray = Array.from(projectsArray).map(x => 
            x.textContent.toLowerCase());
        projectsArray.push("all");
        projectsArray.push("+ new project");

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

                // Project inner text
                const projectText = document.createElement("p");
                projectText.textContent = text;
                projectText.classList.add("project-text")
                addedProject.appendChild(projectText);

                // Delete project button
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete");
                deleteBtn.setAttribute("title", "Delete");
                addedProject.appendChild(deleteBtn);      
                
                const inputDiv = document.getElementById("input-div");
                
                const parent = document.getElementById("projects-list");
                parent.insertBefore(addedProject, inputDiv);

                // Make delete button work
                addDeleteBtn(deleteBtn, addedProject);
                
                // Remove input field after new project added to list
                inputDiv.remove();
                
                // Allow pressing new project button again
                newProject();


                // Add to local storage of projects
                let projects = getProjectsFromStorage();
                projects.push(text);
                addProjectsToStorage(projects);

                // Allow selection of new projects
                addHighlight()
            }
        })
        // Cancel button
        const projectCancel = document.getElementById("new-project-cancel");
        projectCancel.addEventListener('click', () => {
            // Remove input field
            const inputDiv = document.getElementById("input-div");
            inputDiv.remove();
            
            // Allow pressing new project button again
            newProject();
        })
    }

    let currentSelection = "All";
    function addHighlight() {
        let projectsArray = document.querySelectorAll(".projects-item, #all-projects");
        Array.from(projectsArray).forEach(element => {
            element.addEventListener("click", function highlight() {
                Array.from(projectsArray).forEach(i => {
                    i.style.backgroundColor = "rgb(0, 7, 93)";
                })
                element.style.backgroundColor = "#3254a8";

                currentSelection = element.textContent;
                render();
            })
        })
    }

    function getCurrentProject() {
        return currentSelection;
    }

    // Store projects in local storage
    function addProjectsToStorage(array) {
        window.localStorage.setItem('projects', JSON.stringify(array));
    }

    // Retrieve projects from local storage
    function getProjectsFromStorage() {
        return JSON.parse(window.localStorage.getItem('projects'));
    }
    
    function startSidebar() {
        controlSidebar();
        newProject();
        addProjects();
    }

    return {
        startSidebar,
        getCurrentProject,
        addProjectsToStorage,
        getProjectsFromStorage
    }
})();

export { sidebarModule }