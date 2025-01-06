import { PageTitleComponent } from './../../page-title/page-title.component';
import { HttpService } from './../../../services/http.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskListsComponent } from '../../task-lists/task-lists.component';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule,PageTitleComponent,TaskListsComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent {
  newTask = '';
  taskList: any[] = [];
  httpService = inject(HttpService);

  ngOnInit(): void {
    this.getALlTask();
  }

  addTask() {
    console.log(this.newTask, 'TaskAdded');
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.getALlTask();
    });
  }

  getALlTask() {
    this.httpService.getALlTask().subscribe((result: any) => {
      this.taskList = result;
    });
  }

  onComplete(task:any){
    task.completed = true;
    console.log('Task Completed',task);
    this.httpService.updateTask(task).subscribe(() =>{

    })
  }

  onImportant(task:any){
    task.important = true;
    console.log('Task Important',task);
    this.httpService.updateTask(task).subscribe(()=>{

    })
  }
}
