import { Component, OnInit } from '@angular/core';
import { KanbanService } from '../kanban.service';
import { Task } from '../task.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  imports: [NgFor, NgIf, FormsModule],
})
export class ToDoComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private kanbanService: KanbanService) {}

  ngOnInit(): void {

    this.kanbanService.tasks$.subscribe((tasks) => {
      this.tasks = tasks.filter(task => task.status === 'To Do');
    });
  }

  addNewTask(): void {
    const newTask: Task = {
      id: this.generateTaskId(),
      name: '',
      description: '',
      status: 'To Do',
      isNew: true,
    };
    this.kanbanService.addTask(newTask);
  }

  submitTask(task: Task): void {
    if (task.isNew) {
      task.isNew = false;
      this.kanbanService.updateTask(task);
    } else {
      this.kanbanService.updateTask(task);
    }
  }
  

  modifyTask(task: Task): void {
    task.isNew = true;
  }

  moveTask(task: Task): void {
    this.kanbanService.updateTaskStatus(task.id, 'In Progress');
  }

  generateTaskId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
