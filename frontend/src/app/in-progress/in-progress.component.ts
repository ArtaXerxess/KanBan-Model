import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { KanbanService } from '../kanban.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-in-progress',
  imports: [NgFor, CommonModule],
  templateUrl: './in-progress.component.html',
  styleUrl: './in-progress.component.css'
})
export class InProgressComponent implements OnInit {
  tasks: Task[] = [];
  
  moveTaskToDone(task: Task) {
    this.kanbanService.updateTaskStatus(task.id,'Done');
  }

  moveTaskToTesting(task:Task){
    this.kanbanService.updateTaskStatus(task.id,'Testing');
  }

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.kanbanService.tasks$.subscribe((task) => {
      this.tasks = task.filter((task) => task.status === 'In Progress');
    })
  }

}
