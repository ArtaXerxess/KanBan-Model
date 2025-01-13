import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-done',
  imports: [NgFor],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css'
})
export class DoneComponent implements OnInit {
  Finish(task: Task) {
    this.kanbanService.deleteTask(task);
  }
  moveTaskToInProgress(task: Task) {
    this.kanbanService.updateTaskStatus(task.id, 'In Progress');
  }

  tasks: Task[] = [];

  constructor(private kanbanService: KanbanService) { }

  /**
   * Initializing component with kanban cards marked with 'Done' 
   */
  ngOnInit(): void {
    this.kanbanService.tasks$.subscribe((task) => {
      this.tasks = task.filter((task) => task.status === 'Done');
    })
  }
}
