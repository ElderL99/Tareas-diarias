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
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }

    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
    newTask.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.className = 'btn btn-success btn-sm';
    completeButton.textContent = 'Completar';
    completeButton.onclick = function() {
        newTask.classList.toggle('completed');
    };

    newTask.appendChild(completeButton);
    taskList.appendChild(newTask);

    taskInput.value = '';
}

document.getElementById('new-task').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
