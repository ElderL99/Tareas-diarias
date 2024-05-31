document.addEventListener('DOMContentLoaded', loadTasks);

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Llamada inicial para que el reloj aparezca inmediatamente

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskTimeInput = document.getElementById('task-time');
    const taskText = taskInput.value.trim();
    const taskTime = taskTimeInput.value;

    if (taskText === '' || taskTime === '') {
        alert('Por favor, escribe una tarea y selecciona una hora.');
        return;
    }

    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
    newTask.innerHTML = `<span>${taskTime} - ${taskText}</span>`;

    const completeButton = document.createElement('button');
    completeButton.className = 'btn btn-success btn-sm';
    completeButton.textContent = 'Completar';
    completeButton.onclick = function() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const completedTime = `${hours}:${minutes}`;
        newTask.classList.toggle('completed');
        newTask.innerHTML = `<span>${taskTime} - ${taskText}</span><span class="completed-time">Completado a las ${completedTime}</span>`;
        newTask.appendChild(completeButton);
        saveTasks();
    };

    newTask.appendChild(completeButton);
    taskList.appendChild(newTask);

    taskInput.value = '';
    taskTimeInput.value = '';
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
        if (task.completed) {
            newTask.classList.add('completed');
        }
        newTask.innerHTML = `<span>${task.text}</span>`;

        const completeButton = document.createElement('button');
        completeButton.className = 'btn btn-success btn-sm';
        completeButton.textContent = 'Completar';
        completeButton.onclick = function() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const completedTime = `${hours}:${minutes}`;
            newTask.classList.toggle('completed');
            newTask.innerHTML = `<span>${task.text}</span><span class="completed-time">Completado a las ${completedTime}</span>`;
            newTask.appendChild(completeButton);
            saveTasks();
        };

        newTask.appendChild(completeButton);
        taskList.appendChild(newTask);
    });
}

document.getElementById('new-task').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
