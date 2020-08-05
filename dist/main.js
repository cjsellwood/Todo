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
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Allows opening and closing of sidebar on mobile\nfunction controlSidebar() {\n    const openSidebar = document.getElementById(\"open-sidebar\");\n    const sidebar = document.getElementById(\"sidebar\");\n    openSidebar.addEventListener('click', () => {\n        sidebar.style.width = \"80vw\";\n    })\n    \n    const closeSidebar = document.getElementById(\"close-sidebar\");\n    closeSidebar.addEventListener('click', () => {\n        sidebar.style.width = \"0px\";\n    })\n}\n\ncontrolSidebar();\n\n// Create todo object with factory function \n// Need title, description, dueDate, priority\nconst todoFactory = (title, description, dueDate, priority) => {\n    return { title, description, dueDate, priority };\n}\n\nlet shopping = todoFactory(\"Shopping\", \"Going to the shops\", \"04/05/2020\", \"medium\")\nconsole.log(todoFactory)\nconsole.log(shopping)\n\n// Add new project button\nfunction newProject() {\n    const newBtn = document.getElementById(\"new-project\");\n    newBtn.addEventListener(\"click\", function newProjectClick() {\n        // Create div for input and submit button\n        const inputDiv = document.createElement(\"div\");\n        inputDiv.id = \"input-div\";\n        inputDiv.classList.add(\"projects-item\");\n\n        // Text input box\n        projectInput = document.createElement(\"input\");\n        projectInput.id = \"new-project-input\";\n        projectInput.setAttribute(\"type\", \"text\");\n        projectInput.setAttribute(\"placeholder\", \"Name\");\n        inputDiv.appendChild(projectInput);\n\n        // Submit button\n        projectSubmit = document.createElement(\"div\");\n        projectSubmit.id = \"new-project-submit\";\n        inputDiv.appendChild(projectSubmit);\n\n        // Cancel button\n        projectCancel = document.createElement(\"div\");\n        projectCancel.id = \"new-project-cancel\";\n        inputDiv.appendChild(projectCancel);\n\n        const parent = document.getElementById(\"projects-list\");\n        parent.insertBefore(inputDiv, newBtn);\n        \n        // Remove event listener after first click\n        newBtn.removeEventListener('click', newProjectClick);\n\n        saveProject();\n    })\n}\n\nnewProject();\n\n// Save new Project name or cancel input\nfunction saveProject() {\n    const projectInput = document.getElementById(\"new-project-input\");\n    const projectSubmit = document.getElementById(\"new-project-submit\");\n\n    // Array of already defined projects\n    let projectsArray = document.getElementsByClassName(\"projects-item\");\n    projectsArray = Array.from(projectsArray).map(x => x.textContent.toLowerCase());\n\n    projectSubmit.addEventListener('click', () => {\n        let text = projectInput.value;\n        if (text === \"\") {\n            // Indicate that no text entered\n            projectInput.style.borderBottom = \"2px solid red\";\n\n        } else if (projectsArray.indexOf(text.toLowerCase()) !== -1) {\n            // Indicate that there is already a project called that\n            projectInput.value = \"\";\n            projectInput.style.borderBottom = \"2px solid red\";\n            projectInput.setAttribute(\"placeholder\", \"Already Exists\");\n\n        } else if (text.length > 20) {\n            // Indicate that the project name was too long\n            projectInput.value = \"\";\n            projectInput.style.borderBottom = \"2px solid red\";\n            projectInput.setAttribute(\"placeholder\", \"Too Long\");\n\n        } else {\n            const addedProject = document.createElement(\"div\");\n            addedProject.classList.add(\"projects-item\");\n            addedProject.textContent = text;\n\n            const inputDiv = document.getElementById(\"input-div\");\n    \n            const parent = document.getElementById(\"projects-list\");\n            parent.insertBefore(addedProject, inputDiv);\n\n            // Remove input field after new project added to list\n            inputDiv.remove();\n\n            // Allow pressing new project button again\n            newProject();\n        }\n    })\n\n    const projectCancel = document.getElementById(\"new-project-cancel\");\n    projectCancel.addEventListener('click', () => {\n        // Remove input field\n        const inputDiv = document.getElementById(\"input-div\");\n        inputDiv.remove();\n\n        // Allow pressing new project button again\n        newProject();\n    })\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });