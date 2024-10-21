document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  const addTaskButton = document.getElementById("add-task");
  addTaskButton.addEventListener("click", addTask);

  const taskInput = document.getElementById("task-input");
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    saveTask(task);
    taskInput.value = "";
    renderTasks();
  } else {
    alert("Por favor, insira uma tarefa!");
  }
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function renderTasks() {
  const tasks = getTasks();
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => toggleTaskCompletion(task.id));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.classList.add("remove-btn");
    removeButton.onclick = (e) => {
      e.stopPropagation();
      removeTask(task.id);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);
  });
}

function toggleTaskCompletion(taskId) {
  const tasks = getTasks().map((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function removeTask(taskId) {
  const tasks = getTasks().filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function loadTasks() {
  renderTasks();
}
