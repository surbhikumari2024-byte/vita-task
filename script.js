let tasks = JSON.parse(localStorage.getItem('vitatask_tasks')) || [];

function saveTasks() {
    localStorage.setItem('vitatask_tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const container = document.getElementById('task-list');
    container.innerHTML = '';
    
    tasks.forEach((task, i) => {
        const div = document.createElement('div');
        div.className = `task-item bg-slate-900 rounded-3xl p-5 flex items-center gap-4 ${task.done ? 'opacity-70 line-through' : ''}`;
        div.innerHTML = `
            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleDone(${i})">
            <span class="flex-1">${task.title}</span>
            <button onclick="deleteTask(${i});event.stopImmediatePropagation()" class="text-red-400 hover:text-red-500">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        container.appendChild(div);
    });
}

function addTask() {
    const input = document.getElementById('new-task');
    if (!input.value.trim()) return;
    
    tasks.unshift({ title: input.value.trim(), done: false });
    saveTasks();
    renderTasks();
    updateDashboard();
    input.value = '';
}

function toggleDone(i) {
    tasks[i].done = !tasks[i].done;
    saveTasks();
    renderTasks();
    updateDashboard();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
    updateDashboard();
}

function updateDashboard() {
    document.getElementById('total').textContent = tasks.length;
    document.getElementById('completed').textContent = tasks.filter(t => t.done).length;
    
    const recent = document.getElementById('recent-list');
    recent.innerHTML = tasks.slice(0, 3).map(t => `
        <div class="bg-slate-900 rounded-3xl p-4 flex justify-between">
            <span>${t.title}</span>
            <span class="text-teal-400">${t.done ? '✅' : '⏳'}</span>
        </div>`).join('');
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('nav-' + section).classList.add('active');
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

// Initialize
function init() {
    document.getElementById('date').textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' });
    renderTasks();
    updateDashboard();
}

window.onload = init;