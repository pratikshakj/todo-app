import { HttpService } from './../../../services/http.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss'
})
export class AllTaskComponent {
  newTask='';
  taskList:any []=[];
  httpService = inject(HttpService);

  ngOnInit(): void {
    this.getALlTask();
  }

  addTask(){
    console.log(this.newTask,"TaskAdded");
    this.httpService.addTask(this.newTask).subscribe(()=>{
    this.newTask ='';
    this.getALlTask();
    })
  }

  getALlTask(){
    this.httpService.getALlTask().subscribe((result:any)=>{
      this.taskList=result;
    })
  }
}
