import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { KanbanService } from '../kanban.service';

@Component({
  selector: 'app-testing',
  imports: [NgFor],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent implements OnInit {
  moveTaskToTODO(task: Task) {
    this.kanbanService.updateTaskStatus(task.id, "To Do");
  }
  tasks: Task[] = [];
  moveTaskToDone(task: Task) {
    this.kanbanService.updateTaskStatus(task.id, 'Done');
  }
  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.kanbanService.tasks$.subscribe((task) => {
      this.tasks = task.filter((task) => task.status === 'Testing');
    })
  }
}
