import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListsComponent } from '../../task-lists/task-lists.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [PageTitleComponent,TaskListsComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.scss'
})
export class CompletedTaskComponent {
    newTask = '';
    taskList: any[] = [];
    httpService = inject(HttpService);

    ngOnInit(): void {
      this.getALlTask();
    }

    getALlTask() {
      this.httpService.getALlTask().subscribe((result: any) => {
        this.taskList = result.filter((comp:any)=>comp.completed==true);
      });
    }

    onComplete(task:any){
      task.completed = true;
      console.log('Task Completed',task);
      this.httpService.updateTask(task).subscribe(() =>{
      })
    }

}
