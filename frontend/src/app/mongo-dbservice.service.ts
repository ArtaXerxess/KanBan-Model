import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class MongoDBServiceService {
  private apiURL = 'http://localhost:3000/tasks/';

  constructor(private http: HttpClient) { }

  /**
   * fetch kanban cards/task
   * @returns task[]
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL);
  }

  /**
   * adds kanban card/task
   * @param task Task
   * @returns Task
   */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiURL, task);
  }

  /**
   * update kanban card/task
   * @param task Task
   * @returns Task
   */
  updatetask(task:Task):Observable<Task>{
    return this.http.put<Task>(`${this.apiURL}/${task.id}`,task);
  }

  /**
   * delete the task / kanban card when it is finished 
   * @param task 
   * @returns deleteing that task
   */
  deleteTask(task:Task):Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${task.id}`);
  }
}
