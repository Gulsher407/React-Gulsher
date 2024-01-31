document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
  });
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Trim the input value
    const newTaskText = taskInput.value.trim();

    // Check if the task already exists
    if (!newTaskText || isTaskAlreadyExists(newTaskText)) {
      alert('Task already exists or the input is empty. Please enter a unique task.');
      return;
    }

    const task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };

    appendTaskToDOM(task, taskList);
    saveTask(task);
    taskInput.value = '';
  }

  function appendTaskToDOM(task, taskList) {
    const taskItem = document.createElement('li');
    taskItem.setAttribute('data-id', task.id);
    taskItem.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="${task.completed ? 'line-through m-2 border-2 text-gray-500' : 'text-gray-800'}">${task.text}</span>
        <div class="flex">
          <button onclick="editTask(${task.id})" class="px-2 py-1 m-2 bg-blue-500 text-white rounded-md">Edit</button>
          <button onclick="deleteTask(${task.id})" class="px-2 py-1 m-2 bg-red-500 text-white rounded-md">Delete</button>
          <button onclick="toggleTaskCompletion(${task.id})" class="px-2 py-1 m-2 ${task.completed ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded-md">${task.completed ? 'Incomplete' : 'Complete'}</button>
        </div>
      </div>
    `;
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskList.appendChild(taskItem);
  }

  function editTask(id) {
    const taskItem = document.querySelector(`li[data-id="${id}"]`);
    const taskText = taskItem.querySelector('span').textContent;
    const newTaskText = prompt('Edit task:', taskText);

    if (newTaskText !== null) {
      taskItem.querySelector('span').textContent = newTaskText;
      updateTaskTextInStorage(id, newTaskText);
    }
  }

  function deleteTask(id) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.querySelector(`li[data-id="${id}"]`);

    if (taskItem && confirm('Are you sure you want to delete this task?')) {
      taskList.removeChild(taskItem);
      removeTaskFromStorage(id);
    }
  }

  function toggleTaskCompletion(id) {
    const taskItem = document.querySelector(`li[data-id="${id}"]`);

    if (taskItem) {
      const taskText = taskItem.querySelector('span');
      const completionButton = taskItem.querySelector('button:last-child');

      taskItem.classList.toggle('completed');
      const isCompleted = taskItem.classList.contains('completed');
      taskText.classList.toggle('line-through', isCompleted);
      taskText.classList.toggle('text-gray-500', isCompleted);
      completionButton.classList.toggle('bg-green-500', isCompleted);
      completionButton.classList.toggle('bg-yellow-500', !isCompleted);
      completionButton.textContent = `Mark ${isCompleted ? 'Incomplete' : 'Complete'}`;

      updateTaskCompletionInStorage(id);

      const notificationText = isCompleted
        ? `Task "${taskText.textContent}" completed!`
        : `Task "${taskText.textContent}" marked incomplete!`;

      showNotification(notificationText);
    }
  }

  function showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Manager', { body: message });
    }
  }

  function saveTask(task) {
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function updateTaskCompletionInStorage(id) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function updateTaskTextInStorage(id, newText) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, text: newText } : task));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function removeTaskFromStorage(id) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }

  function loadTasks() {
    const tasks = getTasksFromStorage();
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
      appendTaskToDOM(task, taskList);
    });
  }

  function isTaskAlreadyExists(newTaskText) {
    const tasks = getTasksFromStorage();
    return tasks.some(task => task.text.toLowerCase() === newTaskText.toLowerCase());
  }
