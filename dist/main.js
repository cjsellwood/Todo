/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _sidebar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.js */ \"./src/sidebar.js\");\n\n\n_sidebar_js__WEBPACK_IMPORTED_MODULE_0__[\"sidebarModule\"].startSidebar();\n\n// Allow adding new todo when pressing button\nfunction newTodo() {\n    const newTodoBtn = document.getElementById(\"new-todo\");\n    setMinDate();\n    newTodoBtn.addEventListener(\"click\", () => {\n        newTodoBtn.style.height = \"500px\";\n        const newTodoText = newTodoBtn.getElementsByTagName(\"p\")[0];\n        newTodoText.style.display = \"none\";\n\n        const newTodoForm = document.getElementById(\"new-todo-form\");\n        newTodoForm.style.display = \"block\";\n\n        console.log(_sidebar_js__WEBPACK_IMPORTED_MODULE_0__[\"sidebarModule\"].getCurrentProject())\n\n\n    })\n\n}\n\nnewTodo();\n\n// Cancel new todo form input\nfunction cancelNewTodo() {\n    const cancelBtn = document.getElementById(\"cancel-todo\");\n    cancelBtn.addEventListener(\"click\", () => {\n        event.stopPropagation();\n        closeNewTodo();\n    })\n}\n\n// Hide form for new todo\nfunction closeNewTodo() {\n    const newTodoBtn = document.getElementById(\"new-todo\");\n    newTodoBtn.style.height = \"50px\";\n    const newTodoText = newTodoBtn.getElementsByTagName(\"p\")[0];\n    newTodoText.style.display = \"block\";\n    const newTodoForm = document.getElementById(\"new-todo-form\");\n    newTodoForm.style.display = \"none\";\n}\n\ncancelNewTodo();\n\n// Submit form button\nfunction submitNewTodo() {\n    const submitBtn = document.getElementById(\"submit-todo\");\n    submitBtn.addEventListener(\"click\", () => {\n        event.stopPropagation();\n        \n        // Save todo object to todo array in local storage\n        let todoArray = getTodoFromStorage();\n\n\n        // Values from new todo form\n        const title = document.getElementById(\"title-input\");\n        const description = document.getElementById(\"description-input\");\n        const dueDate = document.getElementById(\"date-input\");\n        const priority = document.getElementById(\"priority-input\");\n\n        // Allow no description and default priority as low\n        if (title.value === \"\") {\n            title.style.borderBottom = \"2px solid red\";\n            title.setAttribute(\"placeholder\", \"Title Required\");\n\n        } else if (dueDate.value === \"\") {\n            dueDate.style.borderBottom = \"2px solid red\";\n            dueDate.setAttribute(\"placeholder\", \"Date Required\");\n            title.style.borderBottom = \"2px solid black\";\n        } else {\n            // Format date\n            let date = new Date(dueDate.value);\n            const months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\",\"Jun\", \"Jul\",\n                            \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\n\n            let formattedDate = `${date.getDate()} ${months[date.getMonth()]}` +\n                            ` ${date.getFullYear()}`;\n\n            // Assign random color to individual todo\n            let color = `hsl(${Math.random() * 360}, 100%, 85%)`;\n\n            // Create new todo\n            const newTodo = todoFactory(title.value, description.value,\n                 formattedDate, color, priority.value, \n                 _sidebar_js__WEBPACK_IMPORTED_MODULE_0__[\"sidebarModule\"].getCurrentProject())\n    \n            // Reset forms\n            title.value = \"\";\n            description.value = \"\";\n            dueDate.value = \"\";\n            const priorityDefault = document.getElementById(\"select-default\");\n            priorityDefault.selected = \"Low\";\n\n            todoArray.push(newTodo);\n            addTodoToStorage(todoArray);\n    \n            closeNewTodo();\n            render();\n        }\n\n    })\n}\n\nsubmitNewTodo();\n\n// Store projects in local storage\nfunction addTodoToStorage(array) {\n    window.localStorage.setItem('todo', JSON.stringify(array));\n}\n\n// Retrieve projects from local storage\nfunction getTodoFromStorage() {\n    return JSON.parse(window.localStorage.getItem('todo'));\n}\n\n\n// Stop selection of dates before today\nfunction setMinDate() {\n    const dateInput = document.getElementById(\"date-input\");\n    const date = new Date();\n    let formattedDate = date.toISOString().split('T')[0];\n    dateInput.setAttribute(\"min\", formattedDate);\n}\n\n// Render todo items in grid\nfunction render() {\n    const container = document.getElementById(\"container\");\n    clearCurrentTodo(container);\n    let project = _sidebar_js__WEBPACK_IMPORTED_MODULE_0__[\"sidebarModule\"].getCurrentProject();\n    const todoArray = getTodoFromStorage();\n    \n    // Create blank list if doesn't exist yet \n    if (todoArray === null) {\n        todoArray = [];\n        addTodoToStorage(todoArray);\n    }\n\n    todoArray.forEach(element => {\n        // Display all todo items\n        if (project === \"All\") {\n            const todo = createTodoDiv(element);\n            container.appendChild(todo);\n        } else {\n            // Display only todo items with selected project\n            if (element.project === project) {\n                const todo = createTodoDiv(element);\n                container.appendChild(todo);\n            }\n        }\n    })\n}\n\n// Create div element with todo details inside\nfunction createTodoDiv(element) {\n    const todo = document.createElement(\"div\");\n\n    const todoTitle = document.createElement(\"h4\");\n    todoTitle.textContent = element.title;\n    todo.appendChild(todoTitle);\n\n    const todoDescription = document.createElement(\"p\");\n    todoDescription.textContent = element.description;\n    todo.appendChild(todoDescription);\n\n    const todoDate = document.createElement(\"p\");\n    todoDate.textContent = element.dueDate;\n    todo.appendChild(todoDate);\n\n    const todoPriority = document.createElement(\"p\");\n    todoPriority.textContent = element.priority;\n    todo.appendChild(todoPriority);\n\n    todo.style.backgroundColor = element.color;\n    todo.classList.add(\"grid-item\");\n    return todo;\n}\n\nrender();\n\nfunction clearCurrentTodo(parent) {\n    parent.querySelectorAll(\"*\").forEach(element => element.remove());\n}\n\n\n\n\n\n\n\n// Create todo object with factory function \n// Need title, description, dueDate, priority\nconst todoFactory = (title, description, dueDate, color, priority, project) => {\n    return { title, description, dueDate, color, priority, project };\n}\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sidebar.js":
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
/*! exports provided: sidebarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sidebarModule\", function() { return sidebarModule; });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\nconst sidebarModule = (() => {\n    // Allows opening and closing of sidebar on mobile\n    function controlSidebar() {\n        const openSidebar = document.getElementById(\"open-sidebar\");\n        const sidebar = document.getElementById(\"sidebar\");\n        const darkened = document.getElementById(\"darkened\");\n        openSidebar.addEventListener('click', () => {\n            sidebar.style.width = \"80vw\";\n            darkened.style.display = \"block\";\n        })\n        \n        const closeSidebar = document.getElementById(\"close-sidebar\");\n        closeSidebar.addEventListener('click', () => {\n            sidebar.style.width = \"0px\";\n            darkened.style.display = \"none\";\n        })\n        // Darken other side of sidebar\n        darkened.addEventListener('click', () => {\n            darkened.style.display = \"none\";\n            sidebar.style.width = \"0px\";\n        })\n\n    }\n\n    // Add starting projects to list\n    function addProjects() {\n        // Get stored list of projects or set to empty if none exists\n        let projects = getProjectsFromStorage();\n        if (projects === null) {\n            projects = [];\n            addProjectsToStorage(projects);\n        }\n        const projectsList = document.getElementById(\"projects-list\");\n\n        for (let i = 0; i < projects.length; i++) {\n            const addedProject = document.createElement(\"div\");\n            addedProject.classList.add(\"projects-item\");\n\n            // Project inner text\n            const projectText = document.createElement(\"p\");\n            projectText.textContent = projects[i];\n            projectText.classList.add(\"project-text\");\n            addedProject.appendChild(projectText);\n\n            // Delete project button\n            const deleteBtn = document.createElement(\"button\");\n            deleteBtn.classList.add(\"delete\");\n            addedProject.appendChild(deleteBtn, addedProject);\n            \n            const newBtn = document.getElementById(\"new-project\");\n\n            projectsList.insertBefore(addedProject, newBtn);\n\n            addDeleteBtn(deleteBtn, addedProject);\n        }\n        addHighlight()\n    }\n\n    // Makes delete project button work\n    function addDeleteBtn(btn, parent) {\n        btn.addEventListener(\"click\", function newDeleteBtn() {\n            event.stopPropagation();\n            const removed = parent.getElementsByClassName(\"project-text\")[0].textContent;\n\n            // Remove from local storage\n            let projects = getProjectsFromStorage();\n            const removedIndex = projects.indexOf(removed);\n            projects.splice(removedIndex, 1);\n            addProjectsToStorage(projects);\n\n            // If input is open delete it to so that name can be same as deleted\n            const inputDiv = document.getElementById(\"input-div\");\n            if (inputDiv !== null) {\n                inputDiv.remove();\n                newProject();\n            }\n\n            parent.remove();\n\n            btn.removeEventListener(\"click\", newDeleteBtn);\n        })\n    }\n\n    // Add new project button\n    function newProject() {\n        const newBtn = document.getElementById(\"new-project\");\n        newBtn.style.cursor = \"pointer\";\n        newBtn.addEventListener(\"click\", function newProjectClick() {\n            // Create div for input and submit button\n            const inputDiv = document.createElement(\"div\");\n            inputDiv.id = \"input-div\";\n            inputDiv.classList.add(\"projects-item\");\n            \n            // Text input box\n            const projectInput = document.createElement(\"input\");\n            projectInput.id = \"new-project-input\";\n            projectInput.setAttribute(\"type\", \"text\");\n            projectInput.setAttribute(\"placeholder\", \"Name\");\n            inputDiv.appendChild(projectInput);\n\n            // Submit button\n            const projectSubmit = document.createElement(\"div\");\n            projectSubmit.id = \"new-project-submit\";\n            inputDiv.appendChild(projectSubmit);\n            \n            // Cancel button\n            const projectCancel = document.createElement(\"div\");\n            projectCancel.id = \"new-project-cancel\";\n            inputDiv.appendChild(projectCancel);\n            \n            const parent = document.getElementById(\"projects-list\");\n            parent.insertBefore(inputDiv, newBtn);\n            \n            // Remove event listener after first click\n            newBtn.removeEventListener('click', newProjectClick);\n            \n            // Enables saving of input\n            saveProject();\n\n            // Change cursor on new project button\n            newBtn.style.cursor = \"auto\";\n        })\n    }\n\n    // Save new Project name or cancel input\n    function saveProject() {\n        const projectInput = document.getElementById(\"new-project-input\");\n        const projectSubmit = document.getElementById(\"new-project-submit\");\n        \n        // Array of already defined projects\n        let projectsArray = document.getElementsByClassName(\"project-text\");\n        projectsArray = Array.from(projectsArray).map(x => \n            x.textContent.toLowerCase());\n        projectsArray.push(\"all\");\n        projectsArray.push(\"+ new project\");\n\n        projectSubmit.addEventListener('click', () => {\n            let text = projectInput.value;\n            if (text === \"\") {\n                // Indicate that no text entered\n                projectInput.style.borderBottom = \"2px solid red\";\n                \n            } else if (projectsArray.indexOf(text.toLowerCase()) !== -1) {\n                // Indicate that there is already a project called that\n                projectInput.value = \"\";\n                projectInput.style.borderBottom = \"2px solid red\";\n                projectInput.setAttribute(\"placeholder\", \"Already Exists\");\n                \n            } else if (text.length > 20) {\n                // Indicate that the project name was too long\n                projectInput.value = \"\";\n                projectInput.style.borderBottom = \"2px solid red\";\n                projectInput.setAttribute(\"placeholder\", \"Too Long\");\n            \n            } else {\n                const addedProject = document.createElement(\"div\");\n                addedProject.classList.add(\"projects-item\");\n\n                // Project inner text\n                const projectText = document.createElement(\"p\");\n                projectText.textContent = text;\n                projectText.classList.add(\"project-text\")\n                addedProject.appendChild(projectText);\n\n                // Delete project button\n                const deleteBtn = document.createElement(\"button\");\n                deleteBtn.classList.add(\"delete\");\n                addedProject.appendChild(deleteBtn);      \n                \n                const inputDiv = document.getElementById(\"input-div\");\n                \n                const parent = document.getElementById(\"projects-list\");\n                parent.insertBefore(addedProject, inputDiv);\n\n                // Make delete button work\n                addDeleteBtn(deleteBtn, addedProject);\n                \n                // Remove input field after new project added to list\n                inputDiv.remove();\n                \n                // Allow pressing new project button again\n                newProject();\n\n\n                // Add to local storage of projects\n                let projects = getProjectsFromStorage();\n                projects.push(text);\n                addProjectsToStorage(projects);\n\n                // Allow selection of new projects\n                addHighlight()\n            }\n        })\n        // Cancel button\n        const projectCancel = document.getElementById(\"new-project-cancel\");\n        projectCancel.addEventListener('click', () => {\n            // Remove input field\n            const inputDiv = document.getElementById(\"input-div\");\n            inputDiv.remove();\n            \n            // Allow pressing new project button again\n            newProject();\n        })\n    }\n\n    let currentSelection = \"All\";\n    function addHighlight() {\n        let projectsArray = document.querySelectorAll(\".projects-item, #all-projects\");\n        Array.from(projectsArray).forEach(element => {\n            element.addEventListener(\"click\", function highlight() {\n                Array.from(projectsArray).forEach(i => {\n                    i.style.backgroundColor = \"white\";\n                })\n                element.style.backgroundColor = \"rgb(209, 255, 232)\";\n\n                currentSelection = element.textContent;\n                Object(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"render\"])();\n            })\n        })\n    }\n\n    function getCurrentProject() {\n        return currentSelection;\n    }\n\n    // Store projects in local storage\n    function addProjectsToStorage(array) {\n        window.localStorage.setItem('projects', JSON.stringify(array));\n    }\n\n    // Retrieve projects from local storage\n    function getProjectsFromStorage() {\n        return JSON.parse(window.localStorage.getItem('projects'));\n    }\n\n\n\n\n    function startSidebar() {\n        controlSidebar();\n        newProject();\n        addProjects();\n    }\n\n    return {\n        startSidebar,\n        getCurrentProject\n    }\n})();\n\n\n\n//# sourceURL=webpack:///./src/sidebar.js?");

/***/ })

/******/ });