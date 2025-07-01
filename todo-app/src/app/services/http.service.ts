import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // makes the service avaliable application wide
})
export class HttpService {

  constructor() { }
  httpClient = inject(HttpClient);

  addTask(task:string){
    return this.httpClient.post("http://localhost:3000/tasks",{   //post request method
      title:task
    });
  }

  getALlTask(){
    return this.httpClient.get("http://localhost:3000/tasks"); //get request method
  }

  updateTask(task:any){
    return this.httpClient.put("http://localhost:3000/tasks/" + task.id , task);   //put request method
  }

  deleteTask(task:any){
    return this.httpClient.delete("http://localhost:3000/tasks/" + task.id);   //delete request method
  }
}

