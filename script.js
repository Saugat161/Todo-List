document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const dateDisplay = document.getElementById('date-display');

    // Set Date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateStats();
    };

    const updateStats = () => {
        const activeTasks = tasks.filter(t => !t.completed).length;
        taskCount.innerText = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
    };
    

    const renderTasks = () => {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
                <span>${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})"><i class="ph ph-trash"></i></button>
            `;
            todoList.appendChild(li);
        });
        updateStats();
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const addTask = () => {
        const text = input.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            input.value = '';
            saveTasks();
            renderTasks();
        }
    };


    

    addBtn.addEventListener('click', addTask);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

    document.getElementById('clear-completed').addEventListener('click', () => {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    });

    renderTasks();
});