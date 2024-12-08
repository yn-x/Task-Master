document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Load saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function sortTasks() {
    const taskItems = Array.from(taskList.children);

    taskItems.sort((a, b) => {
      const aCompleted = a.classList.contains("completed");
      const bCompleted = b.classList.contains("completed");
      return aCompleted - bCompleted;
    });

    // Reapply the sorted order to the DOM
    taskItems.forEach((item) => {
      taskList.appendChild(item);
    });
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${
          task.completed ? "checked" : ""
        }>
        <span class="task-text">${task.text}</span>
        <div class="button-group">
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const checkbox = li.querySelector(".task-checkbox");
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      li.classList.toggle("completed");
      saveTasks();
      sortTasks();
    });

    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t !== task);
      li.style.animation = "slideIn 0.3s ease reverse";
      setTimeout(() => {
        li.remove();
        saveTasks();
      }, 300);
    });

    // Edit functionality
    const editBtn = li.querySelector(".edit-btn");
    const taskText = li.querySelector(".task-text");

    editBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "edit-input";
      input.value = task.text;

      taskText.replaceWith(input);
      input.focus();

      const saveEdit = () => {
        const newText = input.value.trim();
        if (newText !== "") {
          task.text = newText;
          taskText.textContent = newText;
          input.replaceWith(taskText);
          saveTasks();
        } else {
          input.replaceWith(taskText);
        }
      };

      input.addEventListener("blur", saveEdit);
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        }
      });
    });

    return li;
  }

  function addTask(text) {
    if (text.trim() === "") return;

    const task = {
      text: text,
      completed: false,
      id: Date.now(),
    };

    tasks.unshift(task);
    const taskElement = createTaskElement(task);
    taskList.insertBefore(taskElement, taskList.firstChild);
    saveTasks();
    sortTasks(); // Ensure proper sorting after adding new task
  }

  function filterTasks(filter) {
    const taskItems = taskList.querySelectorAll(".task-item");

    taskItems.forEach((item) => {
      switch (filter) {
        case "active":
          item.style.display = item.classList.contains("completed")
            ? "none"
            : "flex";
          break;
        case "completed":
          item.style.display = item.classList.contains("completed")
            ? "flex"
            : "none";
          break;
        default:
          item.style.display = "flex";
      }
    });
  }

  // Event Listeners
  addTaskBtn.addEventListener("click", () => {
    addTask(taskInput.value);
    taskInput.value = "";
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(taskInput.value);
      taskInput.value = "";
    }
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filterTasks(btn.dataset.filter);
    });
  });

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }

  // Initial render with sorting
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
  sortTasks();
});
