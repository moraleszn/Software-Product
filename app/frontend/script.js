function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");
        li.className = "task";
        li.textContent = taskText;
        li.onclick = () => toggleCompletion(li);
        taskList.appendChild(li);
        taskInput.value = "";
    }
}

function toggleCompletion(task) {
    task.classList.toggle("completed");
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll("li.task");
    tasks.forEach((task) => {
        if (filter === "all" || task.classList.contains(filter)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll("li.task.completed");
    completedTasks.forEach((task) => {
        task.remove();
    });
}
