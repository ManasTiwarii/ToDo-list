/*document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("addTask");
  const todoList = document.getElementById("todo-list");

  let task = JSON.parse(localStorage.getItem("task")) || [];
  task.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    task.push(newTask);
    saveTask();
    todoInput.value = "";
    console.log(task);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = ` <span>${task.text}</span> <button>delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector('button').addEventListener('click',(e)=> {
      e.stopPropagation()
      task = task.filter(t => t.id !== task.id)
      saveTask();
      

    })

    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("task", JSON.stringify(task));
  }
});
*/
document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("addTask");
  const todoList = document.getElementById("todo-list");

  let task = JSON.parse(localStorage.getItem("task")) || [];
  task.forEach(renderTask); // Render all saved tasks

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    task.push(newTask);
    saveTask();
    renderTask(newTask); // Render new task immediately
    todoInput.value = "";
  });

  function renderTask(taskItem) {
    const li = document.createElement("li");
    li.setAttribute("data-id", taskItem.id);
    if (taskItem.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${taskItem.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      taskItem.completed = !taskItem.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    // delete button event
    li.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation(); //  triggering the li click event

      const taskId = parseInt(li.getAttribute("data-id"));
      task = task.filter((t) => t.id !== taskId); // Remove task from array
      
      saveTask(); // Update localStorage
      li.remove(); // Remove from UI
    });

    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("task", JSON.stringify(task));
  }
});
   