document.addEventListener('DOMContentLoaded', function() {
    loadTasks('adan');
    loadTasks('barbie');
});

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

function addTask(person) {
    const taskInput = document.getElementById(`new-task-${person}`);
    const taskTimeInput = document.getElementById(`task-time-${person}`);
    const taskText = taskInput.value.trim();
    const taskTime = taskTimeInput.value;

    if (taskText === '' || taskTime === '') {
        alert('Por favor, escribe una tarea y selecciona una hora.');
        return;
    }

    const taskList = document.getElementById(`task-list-${person}`);
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
        newTask.appendChild(taskButtons);
        saveTasks(person);
    };

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = function() {
        newTask.remove();
        saveTasks(person);
    };

    const taskButtons = document.createElement('div');
    taskButtons.className = 'task-buttons';
    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(deleteButton);

    newTask.appendChild(taskButtons);
    taskList.appendChild(newTask);

    taskInput.value = '';
    taskTimeInput.value = '';
    saveTasks(person);
}

function saveTasks(person) {
    const taskList = document.getElementById(`task-list-${person}`);
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem(`tasks-${person}`, JSON.stringify(tasks));
}

function loadTasks(person) {
    const tasks = JSON.parse(localStorage.getItem(`tasks-${person}`)) || [];
    const taskList = document.getElementById(`task-list-${person}`);
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
            newTask.appendChild(taskButtons);
            saveTasks(person);
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            newTask.remove();
            saveTasks(person);
        };

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';
        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(deleteButton);

        newTask.appendChild(taskButtons);
        taskList.appendChild(newTask);
    });
}

function clearAllTasks(person) {
    const taskList = document.getElementById(`task-list-${person}`);
    taskList.innerHTML = '';
    saveTasks(person);
}

document.getElementById('new-task-adan').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask('adan');
    }
});

document.getElementById('new-task-barbie').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask('barbie');
    }
});
