import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListsComponent } from '../../task-lists/task-lists.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-task',
  standalone: true,
  imports: [PageTitleComponent, TaskListsComponent],
  templateUrl: './important-task.component.html',
  styleUrl: './important-task.component.scss'
})
export class ImportantTaskComponent {
  newTask = '';
  taskList: any[] = [];
  httpService = inject(HttpService);

  ngOnInit(): void {
    this.getALlTask();
  }

  getALlTask() {
    this.httpService.getALlTask().subscribe((result: any) => {
      this.taskList = result.filter((imp:any)=>imp.important==true);
    });
  }

  onImportant(task:any){
    task.important = true;
    console.log('Task Important',task);
    this.httpService.updateTask(task).subscribe(()=>{
    })
  }
}
