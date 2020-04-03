import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task.model';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  taskForm : FormGroup;
  isAuth: boolean;
  today: Date;

  constructor(private formBuilder: FormBuilder,
              private taskService: TaskService) {
                  this.today = new Date();
              }

  ngOnInit(): void {
    this.initForm();
  }

initForm() {
  this.taskForm = this.formBuilder.group(
    {
      title: ['', Validators.required],
      // desc: ['', Validators.required],
      date: ['', Validators.required]
    }
  );
}

onSaveTasks() {
  const title = this.taskForm.get('title').value;
  // const desc = this.taskForm.get('desc').value;
  const date = this.taskForm.get('date').value;
  const newTask = new Task(title, date);
  newTask.status = false;
  this.taskService.createNewTask(newTask);
}






}
