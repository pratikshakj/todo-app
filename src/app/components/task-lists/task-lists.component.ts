import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-lists.component.html',
  styleUrl: './task-lists.component.scss',
})
export class TaskListsComponent {
  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() completed = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  markComplete(task: any) {
    this.completed.emit(task);
  }

  markImportant(task: any) {
    this.important.emit(task);
  }

  deleteTask(task: any) {
    this.delete.emit(task);
  }
}
