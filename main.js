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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _sidebar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.js */ \"./src/sidebar.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ \"./src/storage.js\");\n\n\n\n\n\n\n\n// Allow adding new todo when pressing button\nfunction newTodo() {\n    const newTodoBtn = document.getElementById(\"new-todo\");\n    const dateInput = document.getElementById(\"date-input\");\n    setMinDate(dateInput);\n\n    // Add color change on hover\n    newTodoBtn.addEventListener(\"mouseover\", newTodoHover)\n    newTodoBtn.addEventListener(\"mouseleave\", () => {\n        newTodoBtn.style.backgroundColor = \"rgb(0, 7, 93)\";\n    })\n\n    newTodoBtn.addEventListener(\"click\", () => {\n        newTodoBtn.style.height = \"auto\";\n        const newTodoText = newTodoBtn.getElementsByTagName(\"p\")[0];\n        newTodoText.style.display = \"none\";\n        newTodoBtn.style.cursor = \"auto\";\n        newTodoBtn.style.backgroundColor = \"rgb(0, 7, 93)\";\n        newTodoBtn.removeEventListener(\"mouseover\", newTodoHover)\n\n        const newTodoForm = document.getElementById(\"new-todo-form\");\n        newTodoForm.style.display = \"block\";\n    })\n}\n\n// Change color of new todo button on hover\nfunction newTodoHover() {\n    const newTodoBtn = document.getElementById(\"new-todo\");\n    newTodoBtn.style.backgroundColor = \"#3254a8\";\n    newTodoBtn.style.transition = \"0s\";\n}\n\n// Cancel new todo form input\nfunction cancelNewTodo() {\n    const cancelBtn = document.getElementById(\"cancel-todo\");\n    cancelBtn.addEventListener(\"click\", () => {\n        event.stopPropagation();\n        closeNewTodo();\n\n        // Values from new todo form\n        const title = document.getElementById(\"title-input\");\n        const description = document.getElementById(\"description-input\");\n        const dueDate = document.getElementById(\"date-input\");\n\n        // Reset forms\n        title.value = \"\";\n        description.value = \"\";\n        dueDate.value = \"\";\n        const priorityDefault = document.getElementById(\"select-default\");\n        priorityDefault.selected = \"Low\";\n        title.style.border = \"1px solid white\";\n        title.setAttribute(\"Placeholder\", \"\");\n        dueDate.style.border = \"1px solid white\";\n    })\n}\n\n// Hide form for new todo\nfunction closeNewTodo() {\n    const newTodoBtn = document.getElementById(\"new-todo\");\n    newTodoBtn.style.height = \"50px\";\n    newTodoBtn.style.cursor = \"pointer\";\n    const newTodoText = newTodoBtn.getElementsByTagName(\"p\")[0];\n    newTodoText.style.display = \"block\";\n    const newTodoForm = document.getElementById(\"new-todo-form\");\n    newTodoForm.style.display = \"none\";\n    newTodoBtn.addEventListener(\"mouseover\", newTodoHover)\n}\n\n// Submit form button\nfunction submitNewTodo() {\n    const submitBtn = document.getElementById(\"submit-todo\");\n    submitBtn.addEventListener(\"click\", () => {\n        event.stopPropagation();\n        \n        // Save todo object to todo array in local storage\n        let todoArray = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('todo');\n\n        // Values from new todo form\n        const title = document.getElementById(\"title-input\");\n        const description = document.getElementById(\"description-input\");\n        const dueDate = document.getElementById(\"date-input\");\n        const priority = document.getElementById(\"priority-input\");\n\n        // Allow no description and default priority as low\n        if (title.value === \"\") {\n            title.style.border = \"1px solid red\";\n            title.setAttribute(\"placeholder\", \"Title Required\");\n            dueDate.style.border = \"1px solid white\";\n\n        } else if (dueDate.value === \"\") {\n            dueDate.style.border = \"1px solid red\";\n            title.style.border = \"1px solid white\";\n        } else {\n            // Format date\n            const formattedDate = formatDate(dueDate);\n\n            // Assign random color to individual todo\n            let color = `hsl(${Math.random() * 360}, 100%, 85%)`;\n\n            // Create new todo\n            const newTodo = todoFactory(title.value, description.value,\n                 formattedDate, color, priority.value, \n                 _sidebar_js__WEBPACK_IMPORTED_MODULE_0__[\"sidebarModule\"].getCurrentProject())\n    \n            // Reset forms\n            title.value = \"\";\n            description.value = \"\";\n            dueDate.value = \"\";\n            const priorityDefault = document.getElementById(\"select-default\");\n            priorityDefault.selected = \"Low\";\n\n            todoArray.push(newTodo);\n            _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].addToStorage(todoArray, 'todo');\n    \n            closeNewTodo();\n            render();\n        }\n\n    })\n}\n\n// Stop selection of dates before today\nfunction setMinDate(dateInput) {\n    const date = new Date();\n    let formattedDate = date.toISOString().split('T')[0];\n    dateInput.setAttribute(\"min\", formattedDate);\n}\n\n// Format date for display on todo items\nfunction formatDate(inputDate) {\n    let date = new Date(inputDate.value);\n    const months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\",\"Jun\", \"Jul\",\n                    \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\n\n    let formattedDate = `${date.getDate()} ${months[date.getMonth()]}` +\n                    ` ${date.getFullYear()}`;\n    return formattedDate;\n}\n\n// Render todo items in grid\nfunction render() {\n    const container = document.getElementById(\"container\");\n    clearCurrentTodo(container);\n    let project = _sidebar_js__WEBPACK_IMPORTED_MODULE_0__[\"sidebarModule\"].getCurrentProject();\n    let todoArray = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('todo');\n    \n    todoArray.forEach((element, i) => {\n        // Display all todo items\n        if (project === \"All\") {\n            const todo = createTodoDiv(element, i);\n            container.appendChild(todo);\n        } else {\n            // Display only todo items with selected project\n            if (element.project === project) {\n                const todo = createTodoDiv(element, i);\n                container.appendChild(todo);\n            }\n        }\n    })\n}\n\n// Delete todo from both storage and display\nfunction addDeleteTodo(deleteBtn, todo) {\n    deleteBtn.addEventListener(\"click\", () => {\n        // Remove todo from display\n        todo.remove();\n\n        // Delete corresponding projects from array with the index from todo\n        const index = todo.getAttribute(\"data-index\");\n        console.log(index);\n\n        let projects = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('todo');\n        projects.splice(index, 1);\n        _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].addToStorage(projects, 'todo');\n    })\n}\n\n// Edit todo in storage and display\nfunction addEditTodo(editBtn, todo) {\n    editBtn.addEventListener(\"click\", () => {\n        // Clear all nodes from todo item\n        clearCurrentTodo(todo)\n\n        const index = todo.getAttribute(\"data-index\");\n        let todoArray = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('todo');\n\n        // Create form layout with values already filled in\n        const editForm = document.createElement(\"form\");\n        editForm.classList.add(\"edit-todo-form\");\n        editForm.setAttribute(\"data-index\", index);\n\n        const titleLabel = document.createElement(\"label\");\n        titleLabel.textContent = \"Title\";\n        editForm.appendChild(titleLabel);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        const titleInput = document.createElement(\"input\");\n        titleInput.classList.add(\"edit-title\");\n        titleInput.setAttribute(\"type\", \"text\");\n        titleInput.value = todoArray[index].title;\n        editForm.appendChild(titleInput);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        const descriptionLabel = document.createElement(\"label\");\n        descriptionLabel.textContent = \"Description\";\n        editForm.appendChild(descriptionLabel);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        const descriptionInput = document.createElement(\"textarea\");\n        descriptionInput.classList.add(\"edit-description\");\n        descriptionInput.textContent = todoArray[index].description;\n        editForm.appendChild(descriptionInput);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        const dateLabel = document.createElement(\"label\");\n        dateLabel.textContent = \"Due Date\";\n        editForm.appendChild(dateLabel);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        // Set date by first formatting\n        const dateInput = document.createElement(\"input\");\n        dateInput.classList.add(\"edit-date\");\n        let formattedDate = new Date(todoArray[index].dueDate);\n        let dates = formattedDate.toLocaleDateString().split(\"/\");\n        dateInput.defaultValue = `${dates[2]}-${dates[1]}-${dates[0]}`;\n        setMinDate(dateInput);\n        dateInput.setAttribute(\"type\", \"date\");\n        editForm.appendChild(dateInput);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        const priorityLabel = document.createElement(\"label\");\n        priorityLabel.textContent = \"Priority\";\n        editForm.appendChild(priorityLabel);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        const select = document.createElement(\"select\");\n        select.classList.add(\"edit-priority\");\n\n        const optionLow = document.createElement(\"option\");\n        optionLow.setAttribute(\"value\", \"Low\");\n        optionLow.textContent = \"Low\";\n        select.appendChild(optionLow);\n\n        const optionMedium = document.createElement(\"option\");\n        optionMedium.setAttribute(\"value\", \"Medium\");\n        optionMedium.textContent = \"Medium\";\n        if (todoArray[index].priority === \"Medium\") {\n            optionMedium.setAttribute(\"selected\", \"selected\");\n        }\n        select.appendChild(optionMedium);\n\n        const optionHigh = document.createElement(\"option\");\n        optionHigh.setAttribute(\"value\", \"High\");\n        optionHigh.textContent = \"High\";\n        if (todoArray[index].priority === \"High\") {\n            optionHigh.setAttribute(\"selected\", \"selected\");\n        }\n        select.appendChild(optionHigh);\n\n        editForm.appendChild(select);\n        editForm.appendChild(document.createElement(\"br\"));\n\n        const submitBtn = document.createElement(\"button\");\n        submitBtn.setAttribute(\"type\", \"button\");\n        submitBtn.classList.add(\"edit-save\");\n        submitBtn.textContent = \"Save\";\n        editForm.appendChild(submitBtn);\n\n        const cancelBtn = document.createElement(\"button\");\n        cancelBtn.setAttribute(\"type\", \"button\");\n        cancelBtn.classList.add(\"edit-save\");\n        cancelBtn.textContent = \"Cancel\";\n        editForm.appendChild(cancelBtn);\n\n        todo.appendChild(editForm);\n\n        // Add cancel button functionality\n        cancelBtn.addEventListener(\"click\", () => {\n            // Replace todo form with new div\n            const replacementTodo = createTodoDiv(todoArray[index], index);\n            todo.parentNode.replaceChild(replacementTodo, todo);\n        })\n\n        // Add submit button functionality\n        submitBtn.addEventListener(\"click\", () => {\n            const updatedForm = document.querySelector(`form[data-index=\"${index}\"]`);\n\n            // Update todo with entered values\n            const title = updatedForm.querySelector(\".edit-title\");\n            const description = updatedForm.querySelector(\".edit-description\");\n            const dueDate = updatedForm.querySelector(\".edit-date\");\n            const priority = updatedForm.querySelector(\".edit-priority\");\n\n            // Allow no description and default priority as low\n            if (title.value === \"\") {\n                title.style.border = \"1px solid red\";\n                title.setAttribute(\"placeholder\", \"Title Required\");\n                dueDate.style.border = \"1px solid black\";\n\n            } else if (dueDate.value === \"\") {\n                dueDate.style.border = \"1px solid red\";\n                title.style.border = \"1px solid black\";\n            } else {\n                // Format date\n                todoArray[index].title = title.value;\n                todoArray[index].description = description.value;\n                todoArray[index].dueDate = formatDate(dueDate);\n                todoArray[index].priority = priority.value;\n                _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].addToStorage(todoArray, 'todo');\n    \n                // Replace todo form with new div\n                const replacementTodo = createTodoDiv(todoArray[index], index);\n                todo.parentNode.replaceChild(replacementTodo, todo);\n            }\n        })\n    })\n}\n\n// Create div element with todo details inside\nfunction createTodoDiv(element, i) {\n    const todo = document.createElement(\"div\");\n    todo.setAttribute(\"data-index\", i);\n\n    const todoTitle = document.createElement(\"h4\");\n    todoTitle.textContent = element.title;\n    todoTitle.classList.add(\"todo-title\");\n    todo.appendChild(todoTitle);\n\n    const todoDate = document.createElement(\"p\");\n    todoDate.textContent = element.dueDate;\n    todoDate.classList.add(\"todo-date\");\n    todo.appendChild(todoDate);\n\n    const todoDescription = document.createElement(\"p\");\n    todoDescription.textContent = element.description;\n    todoDescription.classList.add(\"todo-description\")\n    todo.appendChild(todoDescription);\n\n    const todoPriority = document.createElement(\"p\");\n    todoPriority.classList.add(\"todo-priority\");\n    todo.appendChild(todoPriority);\n\n    // Set top border color based on priority\n    if (element.priority === \"Low\") {\n        todo.style.borderTop = \"8px solid #00c220\";\n    } else if (element.priority === \"Medium\") {\n        todo.style.borderTop = \"8px solid #fce803\";\n    } else {\n        todo.style.borderTop = \"8px solid red\";\n    }\n\n    const buttons = document.createElement(\"div\");\n\n    const editBtn = document.createElement(\"button\");\n    editBtn.classList.add(\"edit-button\");\n    buttons.appendChild(editBtn);\n\n    const deleteBtn = document.createElement(\"button\");\n    deleteBtn.classList.add(\"delete-button\");\n    deleteBtn.setAttribute(\"title\", \"Delete\");\n\n    // Make edit and delete button functional\n    addEditTodo(editBtn, todo);\n    addDeleteTodo(deleteBtn, todo);\n\n    buttons.appendChild(deleteBtn);\n    todo.appendChild(buttons);\n\n    todo.style.backgroundColor = element.color;\n    todo.classList.add(\"grid-item\");\n    return todo;\n}\n\nfunction clearCurrentTodo(parent) {\n    parent.querySelectorAll(\"*\").forEach(element => element.remove());\n}\n\n// Sort by Priority button\nfunction sortByPriority() {\n    const sortBtn = document.getElementById(\"sort-priority\");\n    sortBtn.addEventListener(\"click\", () => {\n        let array = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('todo');\n        let newArray = [];\n        // Sort By Priority\n        array.forEach(element => {\n            if (element.priority === \"High\") {\n                newArray.push(element);\n            }\n        })\n        array.forEach(element => {\n            if (element.priority === \"Medium\") {\n                newArray.push(element);\n            }\n        })\n        array.forEach(element => {\n            if (element.priority === \"Low\") {\n                newArray.push(element);\n            }\n        })\n\n        if (array.every((val, index) => val === newArray[index])) {\n            console.log(\"equal\");\n            newArray.reverse();\n        }\n        \n        _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].addToStorage(newArray, 'todo');\n        render();\n    });\n}\n\n// Sort by date button\nfunction sortByDate() {\n    const sortBtn = document.getElementById(\"sort-date\");\n    sortBtn.addEventListener(\"click\", () => {\n        let array = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('todo');\n        let newArray = [...array];\n        // Sort by date\n        newArray.sort(function(a, b) {\n            return new Date(a.dueDate) - new Date(b.dueDate);\n        })\n        \n        if (array.every((val, index) => val === newArray[index])) {\n            console.log(\"equal\");\n            newArray.reverse();\n        }\n        _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].addToStorage(newArray, 'todo');\n        render();\n    });\n}\n\n\n\n// Create todo object with factory function \n// Need title, description, dueDate, priority\nconst todoFactory = (title, description, dueDate, color, priority, project) => {\n    return { title, description, dueDate, color, priority, project };\n}\n\n_sidebar_js__WEBPACK_IMPORTED_MODULE_0__[\"sidebarModule\"].startSidebar();\n\nnewTodo();\ncancelNewTodo();\nsubmitNewTodo();\nrender();\nsortByPriority();\nsortByDate();\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sidebar.js":
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
/*! exports provided: sidebarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sidebarModule\", function() { return sidebarModule; });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ \"./src/storage.js\");\n\n\n\nconst sidebarModule = (() => {\n    // Allows opening and closing of sidebar on mobile\n    function controlSidebar() {\n        const openSidebar = document.getElementById(\"open-sidebar\");\n        const sidebar = document.getElementById(\"sidebar\");\n        const darkened = document.getElementById(\"darkened\");\n        openSidebar.addEventListener('click', () => {\n            sidebar.style.width = \"80vw\";\n            darkened.style.display = \"block\";\n        })\n        \n        const closeSidebar = document.getElementById(\"close-sidebar\");\n        closeSidebar.addEventListener('click', () => {\n            sidebar.style.width = \"0px\";\n            darkened.style.display = \"none\";\n        })\n        // Darken other side of sidebar\n        darkened.addEventListener('click', () => {\n            darkened.style.display = \"none\";\n            sidebar.style.width = \"0px\";\n        })\n\n    }\n\n    // Add starting projects to list\n    function addProjects() {\n        // Get stored list of projects or set to empty if none exists\n        let projects = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('projects');\n        const projectsList = document.getElementById(\"projects-list\");\n\n        for (let i = 0; i < projects.length; i++) {\n            const addedProject = document.createElement(\"div\");\n            addedProject.classList.add(\"projects-item\");\n\n            // Project inner text\n            const projectText = document.createElement(\"p\");\n            projectText.textContent = projects[i];\n            projectText.classList.add(\"project-text\");\n            addedProject.appendChild(projectText);\n\n            // Delete project button\n            const deleteBtn = document.createElement(\"button\");\n            deleteBtn.classList.add(\"delete\");\n            deleteBtn.setAttribute(\"title\", \"Delete\");\n            addedProject.appendChild(deleteBtn, addedProject);\n            \n            const newBtn = document.getElementById(\"new-project\");\n\n            projectsList.insertBefore(addedProject, newBtn);\n\n            addDeleteBtn(deleteBtn, addedProject);\n        }\n        addHighlight()\n    }\n\n    // Makes delete project button work\n    function addDeleteBtn(btn, parent) {\n        btn.addEventListener(\"click\", function newDeleteBtn() {\n            event.stopPropagation();\n            const removed = parent.getElementsByClassName(\"project-text\")[0].textContent;\n\n            // Remove from local storage\n            let projects = getProjectsFromStorage();\n            const removedIndex = projects.indexOf(removed);\n            projects.splice(removedIndex, 1);\n            _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].addToStorage(projects, 'projects');\n\n            // If input is open delete it to so that name can be same as deleted\n            const inputDiv = document.getElementById(\"input-div\");\n            if (inputDiv !== null) {\n                inputDiv.remove();\n                newProject();\n            }\n\n            parent.remove();\n\n            btn.removeEventListener(\"click\", newDeleteBtn);\n        })\n    }\n\n    // Add new project button\n    function newProject() {\n        const newBtn = document.getElementById(\"new-project\");\n        newBtn.style.cursor = \"pointer\";\n        newBtn.addEventListener(\"click\", function newProjectClick() {\n            // Create div for input and submit button\n            const inputDiv = document.createElement(\"div\");\n            inputDiv.id = \"input-div\";\n            inputDiv.classList.add(\"projects-item\");\n            \n            // Text input box\n            const projectInput = document.createElement(\"input\");\n            projectInput.id = \"new-project-input\";\n            projectInput.setAttribute(\"type\", \"text\");\n            projectInput.setAttribute(\"placeholder\", \"Name\");\n            inputDiv.appendChild(projectInput);\n\n            // Submit button\n            const projectSubmit = document.createElement(\"div\");\n            projectSubmit.id = \"new-project-submit\";\n            projectSubmit.setAttribute(\"title\", \"Save\");\n            inputDiv.appendChild(projectSubmit);\n            \n            // Cancel button\n            const projectCancel = document.createElement(\"div\");\n            projectCancel.id = \"new-project-cancel\";\n            projectCancel.setAttribute(\"title\", \"Cancel\");\n            inputDiv.appendChild(projectCancel);\n            \n            const parent = document.getElementById(\"projects-list\");\n            parent.insertBefore(inputDiv, newBtn);\n            \n            // Remove event listener after first click\n            newBtn.removeEventListener('click', newProjectClick);\n            \n            // Enables saving of input\n            saveProject();\n\n            // Change cursor on new project button\n            newBtn.style.cursor = \"auto\";\n        })\n    }\n\n    // Save new Project name or cancel input\n    function saveProject() {\n        const projectInput = document.getElementById(\"new-project-input\");\n        const projectSubmit = document.getElementById(\"new-project-submit\");\n        \n        // Array of already defined projects\n        let projectsArray = document.getElementsByClassName(\"project-text\");\n        projectsArray = Array.from(projectsArray).map(x => \n            x.textContent.toLowerCase());\n        projectsArray.push(\"all\");\n        projectsArray.push(\"+ new project\");\n\n        projectSubmit.addEventListener('click', () => {\n            let text = projectInput.value;\n            if (text === \"\") {\n                // Indicate that no text entered\n                projectInput.style.borderBottom = \"2px solid red\";\n                \n            } else if (projectsArray.indexOf(text.toLowerCase()) !== -1) {\n                // Indicate that there is already a project called that\n                projectInput.value = \"\";\n                projectInput.style.borderBottom = \"2px solid red\";\n                projectInput.setAttribute(\"placeholder\", \"Already Exists\");\n                \n            } else if (text.length > 20) {\n                // Indicate that the project name was too long\n                projectInput.value = \"\";\n                projectInput.style.borderBottom = \"2px solid red\";\n                projectInput.setAttribute(\"placeholder\", \"Too Long\");\n            \n            } else {\n                const addedProject = document.createElement(\"div\");\n                addedProject.classList.add(\"projects-item\");\n\n                // Project inner text\n                const projectText = document.createElement(\"p\");\n                projectText.textContent = text;\n                projectText.classList.add(\"project-text\")\n                addedProject.appendChild(projectText);\n\n                // Delete project button\n                const deleteBtn = document.createElement(\"button\");\n                deleteBtn.classList.add(\"delete\");\n                deleteBtn.setAttribute(\"title\", \"Delete\");\n                addedProject.appendChild(deleteBtn);      \n                \n                const inputDiv = document.getElementById(\"input-div\");\n                \n                const parent = document.getElementById(\"projects-list\");\n                parent.insertBefore(addedProject, inputDiv);\n\n                // Make delete button work\n                addDeleteBtn(deleteBtn, addedProject);\n                \n                // Remove input field after new project added to list\n                inputDiv.remove();\n                \n                // Allow pressing new project button again\n                newProject();\n\n\n                // Add to local storage of projects\n                let projects = _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].getFromStorage('projects');\n                projects.push(text);\n                _storage_js__WEBPACK_IMPORTED_MODULE_1__[\"storage\"].addToStorage(projects, 'projects');\n\n                // Allow selection of new projects\n                addHighlight()\n            }\n        })\n        // Cancel button\n        const projectCancel = document.getElementById(\"new-project-cancel\");\n        projectCancel.addEventListener('click', () => {\n            // Remove input field\n            const inputDiv = document.getElementById(\"input-div\");\n            inputDiv.remove();\n            \n            // Allow pressing new project button again\n            newProject();\n        })\n    }\n\n    let currentSelection = \"All\";\n    function addHighlight() {\n        let projectsArray = document.querySelectorAll(\".projects-item, #all-projects\");\n        Array.from(projectsArray).forEach(element => {\n            element.addEventListener(\"click\", function highlight() {\n                Array.from(projectsArray).forEach(i => {\n                    i.style.backgroundColor = \"rgb(0, 7, 93)\";\n                })\n                element.style.backgroundColor = \"#3254a8\";\n\n                currentSelection = element.textContent;\n                Object(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"render\"])();\n            })\n        })\n    }\n\n    function getCurrentProject() {\n        return currentSelection;\n    }\n\n    function startSidebar() {\n        controlSidebar();\n        newProject();\n        addProjects();\n    }\n\n    return {\n        startSidebar,\n        getCurrentProject,\n    }\n})();\n\n\n\n//# sourceURL=webpack:///./src/sidebar.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/*! exports provided: storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"storage\", function() { return storage; });\nconst storage = (() => {\n    // Store projects in local storage\n    function addToStorage(array, item) {\n        window.localStorage.setItem(item, JSON.stringify(array));\n    }\n    \n    // Retrieve projects from local storage\n    function getFromStorage(item) {\n        let returnArray = JSON.parse(window.localStorage.getItem(item));\n\n        // Create blank list if doesn't exist yet \n        if (returnArray === null) {\n            returnArray = [];\n        }\n        return returnArray;\n    }\n\n    return {\n        addToStorage,\n        getFromStorage\n    }\n})();\n\n\n\n//# sourceURL=webpack:///./src/storage.js?");

/***/ })

/******/ });