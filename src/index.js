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