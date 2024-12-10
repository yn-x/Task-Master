document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const themeToggle = document.getElementById("themeToggle");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Load saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.checked = savedTheme === "dark";

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
        <div class="checkbox-wrapper-19">
            <input type="checkbox" id="task-${task.id}" ${
      task.completed ? "checked" : ""
    }>
            <label class="check-box" for="task-${task.id}"></label>
        </div>
        <span class="task-text">${task.text}</span>
        <div class="button-group">
            <button class="edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path stroke-dasharray="20" stroke-dashoffset="20" d="M3 21h18">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/>
                        </path>
                        <path stroke-dasharray="48" stroke-dashoffset="48" d="M7 17v-4l10 -10l4 4l-10 10h-4">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.6s" values="48;0"/>
                        </path>
                        <path stroke-dasharray="8" stroke-dashoffset="8" d="M14 6l4 4">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0"/>
                        </path>
                    </g>
                </svg>
            </button>
            <button class="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path stroke-dasharray="64" stroke-dashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/>
                        </path>
                        <path stroke-dasharray="8" stroke-dashoffset="8" d="M12 12l4 4M12 12l-4 -4M12 12l-4 4M12 12l4 -4">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/>
                        </path>
                    </g>
                </svg>
            </button>
        </div>
    `;

    const checkbox = li.querySelector(`#task-${task.id}`);
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
  document.querySelector(".input-section").addEventListener("click", (e) => {
    if (e.target.closest(".button")) {
      addTask(taskInput.value);
      taskInput.value = "";
    }
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
  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Initial render with sorting
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
  sortTasks();

  // Update the button in your HTML
  document.querySelector(".input-section button").outerHTML = `
    <button class="button" type="button">
        <span class="button__text">Add Task</span>
        <span class="button__icon">
            <svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
        </span>
    </button>
  `;
});
