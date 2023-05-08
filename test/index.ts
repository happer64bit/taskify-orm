import TaskifyOrm from 'taskify-orm';

// Create a new instance of TaskOrm by passing the database name as an argument
const taskOrm = new TaskifyOrm('myDatabase.sqlite3');

// Create a new task
const newTask = await taskOrm.createTask('My new task');

// Get a task by ID
const task = await taskOrm.getTask(newTask.id);

// Update a task
const updatedTask = await taskOrm.updateTask(newTask.id, 'My updated task');

// Get all tasks
const allTasks = await taskOrm.getAllTasks();

console.log({
  allTasks,
  task,
  updatedTask,
});
