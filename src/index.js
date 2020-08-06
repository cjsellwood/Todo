import { startSidebar } from './sidebar.js';

startSidebar();




// Create todo object with factory function 
// Need title, description, dueDate, priority
const todoFactory = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
}

let shopping = todoFactory("Shopping", "Going to the shops", "04/05/2020",
                            "medium");
console.log(todoFactory);
console.log(shopping);
