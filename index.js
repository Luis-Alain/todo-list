document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("taskList");
  const taskForm = document.getElementById("taskForm");

  // Load tasks from localStorage if available
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task) => createTaskElement(task.text, task.done));

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskInput = document.getElementById("tarea");
    const taskText = taskInput.value;

    if (taskText.trim() !== "") {
      const newTask = {
        text: taskText,
        done: false,
      };
      createTaskElement(newTask.text, newTask.done);
      taskInput.value = "";
      savedTasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
  });

  function createTaskElement(taskText, isDone) {
    const li = document.createElement("li");
    li.innerText = taskText;
    if (isDone) {
      li.classList.add("done");
    }

    // Create buttons for delete and mark as done
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
      li.remove();
      savedTasks = savedTasks.filter((task) => task.text !== taskText);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    });

    const markDoneButton = document.createElement("button");
    markDoneButton.innerText = "Mark as Done";
    markDoneButton.addEventListener("click", function () {
      li.classList.toggle("done");
      const task = savedTasks.find((task) => task.text === taskText);
      task.done = !task.done;
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    });

    li.appendChild(deleteButton);
    li.appendChild(markDoneButton);
    taskList.appendChild(li);
  }
});
