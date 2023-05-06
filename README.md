# Task ORM Module
The Task ORM module is a simple Object-Relational Mapping (ORM) library for managing tasks in a SQLite database. It provides basic CRUD (Create, Read, Update, Delete) operations for managing tasks in the database.

# Installation
You can install the Task ORM module using npm:

```bash
npm install taskify-orm
```
# Usage
You can use the Task ORM module in your project by importing it into your JavaScript or TypeScript file:

```javascript
import TaskOrm from 'taskify-orm';
```
Once you have imported the Task ORM module, you can create a new instance of the TaskOrm class:

```javascript
const taskOrm = new TaskOrm('my-database.db');
```

# API
## `createTaskTable(name: string): void`
Creates a new task table with the specified name in the database.

```javascript
taskOrm.createTaskTable('my_task_table');
```
## `createKey(tableId: string, title: string): void`
Inserts a new task with the specified title into the table with the specified ID.

```javascript
taskOrm.createKey('my_task_table', 'Buy groceries');
```

## `deleteKey(tableId: string, id: string): void`
Deletes the task with the specified ID from the table with the specified ID.

```javascript
taskOrm.deleteKey('my_task_table', '1');
```
## `deleteTable(tableId: string): void`
Deletes the table with the specified ID from the database.

```javascript
taskOrm.deleteTable('my_task_table');
```
`setChecked(tableId: string, id: string, isChecked: boolean): void`
Sets the isChecked value of the task with the specified ID in the table with the specified ID.

```javascript
taskOrm.setChecked('my_task_table', '1', true);
```
## `getAllTable(): Promise<string[]>`
Returns a list of all the task tables in the database.

```javascript
const tableList = await taskOrm.getAllTable();
console.log(tableList);```

## `fetchAllInTable(tableId: string): Promise<any[]>`

Returns a list of all the tasks in the table with the specified ID.

```javascript
const taskList = await taskOrm.fetchAllInTable('my_task_table');
console.log(taskList);
```
# Examples
Here are some examples of how you can use the Task ORM module in your project:

```javascript
import TaskOrm from 'taskify-orm';

const taskOrm = new TaskOrm('my-database.db');

// Create a new task table
taskOrm.createTaskTable('my_task_table');

// Insert a new task into the table
taskOrm.createKey('my_task_table', 'Buy groceries');

// Set the isChecked value of a task to true
taskOrm.setChecked('my_task_table', '1', true);

// Fetch all tasks from the table
const taskList = await taskOrm.fetchAllInTable('my_task_table');
console.log(taskList);

// Delete a task from the table
taskOrm.deleteKey('my_task_table', '1');

// Delete the task table
taskOrm.deleteTable('my_task_table');
```