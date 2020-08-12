const helpers = (() => {
  // Allow adding new todo when pressing button
  function newTodo() {
    const newTodoBtn = document.getElementById("new-todo");
    const dateInput = document.getElementById("date-input");
    setMinDate(dateInput);

    // Add color change on hover
    newTodoBtn.addEventListener("mouseover", newTodoHover);
    newTodoBtn.addEventListener("mouseleave", () => {
      newTodoBtn.style.backgroundColor = "rgb(0, 7, 93)";
    });

    // Change to form when pressed
    newTodoBtn.addEventListener("click", () => {
      newTodoBtn.style.height = "auto";
      const newTodoText = newTodoBtn.getElementsByTagName("p")[0];
      newTodoText.style.display = "none";
      newTodoBtn.style.cursor = "auto";
      newTodoBtn.style.backgroundColor = "rgb(0, 7, 93)";
      newTodoBtn.removeEventListener("mouseover", newTodoHover);

      const newTodoForm = document.getElementById("new-todo-form");
      newTodoForm.style.display = "block";
    });
  }

  // Change color of new todo button on hover
  function newTodoHover() {
    const newTodoBtn = document.getElementById("new-todo");
    newTodoBtn.style.backgroundColor = "#3254a8";
    newTodoBtn.style.transition = "0s";
  }

  // Stop selection of dates before today
  function setMinDate(dateInput) {
    const date = new Date();
    let formattedDate = date.toISOString().split("T")[0];
    dateInput.setAttribute("min", formattedDate);
  }

  // Format date for display on todo items
  function formatDate(inputDate) {
    let date = new Date(inputDate.value);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let formattedDate =
      `${date.getDate()} ${months[date.getMonth()]}` + ` ${date.getFullYear()}`;
    return formattedDate;
  }

  // Hide form for new todo
  function closeNewTodo() {
    const newTodoBtn = document.getElementById("new-todo");
    newTodoBtn.style.height = "50px";
    newTodoBtn.style.cursor = "pointer";
    const newTodoText = newTodoBtn.getElementsByTagName("p")[0];
    newTodoText.style.display = "block";
    const newTodoForm = document.getElementById("new-todo-form");
    newTodoForm.style.display = "none";
    newTodoBtn.addEventListener("mouseover", newTodoHover);
  }

  // Cancel new todo form input
  function cancelNewTodo() {
    const cancelBtn = document.getElementById("cancel-todo");
    cancelBtn.addEventListener("click", () => {
      event.stopPropagation();
      closeNewTodo();

      // Values from new todo form
      const title = document.getElementById("title-input");
      const description = document.getElementById("description-input");
      const dueDate = document.getElementById("date-input");

      // Reset forms
      title.value = "";
      description.value = "";
      dueDate.value = "";
      const priorityDefault = document.getElementById("select-default");
      priorityDefault.selected = "Low";
      title.style.border = "1px solid white";
      title.setAttribute("Placeholder", "");
      dueDate.style.border = "1px solid white";
    });
  }

  // Deletes all child nodes of parent
  function clearCurrentTodo(parent) {
    parent.querySelectorAll("*").forEach((element) => element.remove());
  }

  function startHelpers() {
    newTodo();
    cancelNewTodo();
  }
  return {
    startHelpers,
    cancelNewTodo,
    closeNewTodo,
    clearCurrentTodo,
    setMinDate,
    formatDate,
  };
})();

export { helpers };
