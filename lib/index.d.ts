import sqlite3 from 'sqlite3';

declare interface Task {
  id: number;
  title: string;
  isChecked: boolean;
  created_at: string;
}

declare class TaskOrm {
  private db: sqlite3.Database;

  constructor(databaseName: string);

  private initTable(): void;

  createTask(title: string, isChecked?: boolean): Promise<Task>;

  getTask(id: number): Promise<Task>;

  updateTask(id: number, title?: string, isChecked?: boolean): Promise<Task>;

  deleteTask(id: number): Promise<void>;

  getAllTasks(): Promise<Task[]>;

  private run(query: string, params?: any[]): Promise<sqlite3.RunResult>;

  private all(query: string, params?: any[]): Promise<any[]>;
}

export default TaskOrm;
