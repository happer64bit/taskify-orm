# TaskOrm

TaskOrm is a simple ORM class for working with SQLite databases. It provides basic CRUD operations for a tasks table, including creating a new task, retrieving a task by ID, updating a task, deleting a task, and getting all tasks.

## Installation
```npm install sqlite3 taskify-orm```

## Usage
```javascript
import TaskOrm from 'taskify-orm';

// Create a new instance of TaskOrm by passing the database name as an argument
const taskOrm = new TaskOrm('myDatabase.sqlite3');

// Create a new task
const newTask = await taskOrm.createTask('My new task');

// Get a task by ID
const task = await taskOrm.getTask(newTask.id);

// Update a task
const updatedTask = await taskOrm.updateTask(newTask.id, { title: 'My updated task' });

// Delete a task
await taskOrm.deleteTask(newTask.id);

// Get all tasks
const allTasks = await taskOrm.getAllTasks();
```

## API

### `constructor(databaseName: string)`
Creates a new instance of TaskOrm and connects to the specified SQLite database.

`databaseName` - the name of the SQLite database to connect to

### `initTable()`
Initializes the tasks table if it doesn't already exist.

### `async createTask(title: string, isChecked?: boolean): Promise<Task>`
Creates a new task with the specified title and isChecked value. Returns the newly created task.

`title` - the title of the new task
`isChecked` - the checked state of the new task (default is false)
### `async getTask(id: number): Promise<Task>`
Retrieves a task by ID. Returns the task with the specified ID.

`id` - the ID of the task to retrieve
### `async updateTask(id: number, taskData: Partial<Task>): Promise<Task>`
Updates a task with the specified ID using the provided taskData. Returns the updated task.

`id` - the ID of the task to update
taskData - an object containing the updated properties of the task (title and/or isChecked)

`async deleteTask(id: number): Promise<void>`
Deletes a task with the specified ID.

`id` - the ID of the task to delete

### `async getAllTasks(): Promise<Task[]>`
Retrieves all tasks from the database. Returns an array of tasks.

### `async run(query: string, params: any[] = []): Promise<sqlite3.RunResult>`
Executes the specified SQL query with optional parameters. Returns a RunResult object.

`query` - the SQL query to execute
`params` - an array of parameters to replace any placeholders in the query
### `async all(query: string, params: any[] = []): Promise<any[]>`

Retrieves all rows from the database that match the specified SQL query with optional parameters. Returns an array of objects.

`query` - the SQL query to execute
`params` - an array of parameters to replace any placeholders in the query



