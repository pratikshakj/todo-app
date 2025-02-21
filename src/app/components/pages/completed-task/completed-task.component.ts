import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListsComponent } from '../../task-lists/task-lists.component';
import { HttpService } from '../../../services/http.service';
import { StateService } from '../../../services/state.service';

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
    InitialTaskList: any[] = [];
    httpService = inject(HttpService);
    stateService =inject(StateService);

    ngOnInit(): void {
      this.getALlTask();
      this.stateService.searchSubject.subscribe((value) => {
        if(value){
          this.taskList =this.InitialTaskList.filter((x) =>{
            return x.title.toLowerCase().includes(value.toLowerCase())
          })
        }
      });
      this.getALlTask
    }

    getALlTask() {
      this.httpService.getALlTask().subscribe((result: any) => {
        this.taskList = result.filter((comp:any)=>comp.completed==true);
        this.InitialTaskList = this.taskList = result.filter((comp:any)=>comp.completed==true);
      });
    }

    onComplete(task:any){
      task.completed = true;
      console.log('Task Completed',task);
      this.httpService.updateTask(task).subscribe(() =>{
      })
    }

    deleteTask(task: any) {
      this.httpService.deleteTask(task).subscribe(() => {
        this.getALlTask();
      });
    }
}
