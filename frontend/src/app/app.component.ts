import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoComponent } from "./to-do/to-do.component";
import { InProgressComponent } from "./in-progress/in-progress.component";
import { TestingComponent } from "./testing/testing.component";
import { DoneComponent } from "./done/done.component";
import { KanbanService } from './kanban.service';
import { Task } from './task.model';

declare var bootstrap: any;


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoComponent, InProgressComponent, TestingComponent, DoneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'KanBanModel';
  
  constructor(private kanbanService: KanbanService) {}
  
  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }
  ngOnInit(): void {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }
  
  addNewTask() {
    const newTask: Task = {
      id: this.generateTaskId(),
      name: '',
      description: '',
      status: 'To Do',
      isNew: true,
    };
    this.kanbanService.addTask(newTask);
  }
  generateTaskId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
