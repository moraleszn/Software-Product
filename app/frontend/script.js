let tasks = [];

function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            timestamp: new Date(),
            dueDate: null
        };

        tasks.push(newTask);
        renderTasks();
        taskInput.value = "";
    }
}

function toggleCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function filterTasks(status) {
    const filteredTasks = status === "all" ? tasks :
        status === "pending" ? tasks.filter(task => !task.completed) :
        tasks.filter(task => task.completed);

    renderTasks(filteredTasks);
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

function renderTasks(filteredTasks = tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task${task.completed ? " completed" : ""}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <span class="timestamp">${formatTimestamp(task.timestamp)}</span>
            <span class="due-date">${formatDueDate(task.dueDate)}</span>
        `;
        li.onclick = () => toggleCompletion(task.id);
        taskList.appendChild(li);
    });
}

function formatTimestamp(timestamp) {
    const options = { hour: "numeric", minute: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(timestamp);
}

function formatDueDate(dueDate) {
    return dueDate ? `Due: ${dueDate.toLocaleDateString()}` : "";
}
