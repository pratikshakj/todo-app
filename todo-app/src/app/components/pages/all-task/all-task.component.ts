import { PageTitleComponent } from './../../page-title/page-title.component';
import { HttpService } from './../../../services/http.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskListsComponent } from '../../task-lists/task-lists.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, PageTitleComponent, TaskListsComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent {
  newTask = '';
  initialTaskList: any[] = [];
  taskList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);

  ngOnInit(): void {
    this.getALlTask();
    this.stateService.searchSubject.subscribe((value) => {
      console.log("search",value);
      if (value) {
        this.taskList = this.initialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      }else {
        this.taskList = this.initialTaskList;
      }
    });
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
      this.initialTaskList = this.taskList = result;
    });
  }

  onComplete(task: any) {
    task.completed = true;
    console.log('Task Completed', task);
    this.httpService.updateTask(task).subscribe(() => {});
  }

  onImportant(task: any) {
    task.important = true;
    console.log('Task Important', task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getALlTask();
    });
  }

  deleteTask(task: any) {
    this.httpService.deleteTask(task).subscribe(() => {
      this.getALlTask();
    });
  }
}

