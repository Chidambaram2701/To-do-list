let tasks = [];

document.addEventListener("DOMContentLoaded", function () {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
  renderTasks();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("categorySelect").value;
  const taskText = input.value.trim();
  if (taskText === "") return;

  const newTask = {
    text: taskText,
    category: category,
    isCompleted: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  input.value = "";
}

function createTaskItem(task, index) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = task.text;

  const badge = document.createElement("span");
  badge.className = `badge ms-2 ${task.category === "work" ? "badge-work" : "badge-personal"}`;
  badge.textContent = task.category.charAt(0).toUpperCase() + task.category.slice(1);
  taskSpan.appendChild(badge);

  const btnGroup = document.createElement("div");

  if (!task.isCompleted) {
    const completeBtn = document.createElement("button");
    completeBtn.className = "btn btn-sm btn-outline-success me-2";
    completeBtn.textContent = "✔";
    completeBtn.onclick = () => {
      tasks[index].isCompleted = true;
      saveTasks();
      renderTasks();
    };
    btnGroup.appendChild(completeBtn);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-danger";
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  btnGroup.appendChild(deleteBtn);
  li.appendChild(taskSpan);
  li.appendChild(btnGroup);

  if (task.isCompleted) {
    taskSpan.classList.add("completed");
  }

  return li;
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const completedList = document.getElementById("completedList");
  taskList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach((task, index) => {
    const item = createTaskItem(task, index);
    if (task.isCompleted) {
      item.classList.add("animate-complete");
      completedList.appendChild(item);
    } else {
      item.classList.add("animate-add");
      taskList.appendChild(item);
    }
  });
}
