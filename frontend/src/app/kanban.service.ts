import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {

  constructor() {

    const initialTasks: Task[] = [
      { id: 1, name: 'Task 1', description: 'Description for  dummy task Task 1', status: 'To Do', isNew: false },
      { id: 2, name: 'Task 2', description: 'Description for  dummy task Task 2', status: 'To Do', isNew: false },
      { id: 3, name: 'Task 3', description: 'Description for  dummy task Task 3', status: 'In Progress', isNew: false },
      { id: 4, name: 'Task 4', description: 'Description for  dummy task Task 4', status: 'In Progress', isNew: false },
      { id: 5, name: 'Task 5', description: 'Description for  dummy task Task 5', status: 'Testing', isNew: false },
      { id: 6, name: 'Task 6', description: 'Description for  dummy task Task 6', status: 'Testing', isNew: false },
      { id: 7, name: 'Task 7', description: 'Description for dummy task  Task 7', status: 'Done', isNew: false },
      { id: 8, name: 'Task 8', description: 'Description for dummy task  Task 8', status: 'Done', isNew: false },
    ];
    this.tasksSource.next(initialTasks);
  }

  private tasksSource = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSource.asObservable();

  /** 
   Add a new task
   * */
  addTask(task: Task): void {
    const currentTasks = this.tasksSource.value;
    this.tasksSource.next([task, ...currentTasks]);
  }

  /** 
   Update task status (move tasks between columns)
  */
  updateTaskStatus(id: number, status: 'To Do' | 'In Progress' | 'Testing' | 'Done'): void {
    const updatedTasks = this.tasksSource.value.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    this.tasksSource.next(updatedTasks);
  }

  /**
   Update task details (modify task name, description, etc.)
  */
  updateTask(task: Task): void {
    const updatedTasks = this.tasksSource.value.map((t) =>
      t.id === task.id ? { ...t, name: task.name, description: task.description, isNew: false } : t
    );
    this.tasksSource.next(updatedTasks);
  }
  /**
   * delete task, when it is finished
   */
  deleteTask(task: Task): void {
    const updatedTasks = this.tasksSource.value.filter(t => t.id !== task.id);
    this.tasksSource.next(updatedTasks);
  }
}
