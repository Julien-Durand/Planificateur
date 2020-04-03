import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  tasks: Task[];
  taskSubscription: Subscription;

  constructor(private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.taskSubscription = this.taskService.taskSubject.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
    this.taskService.getTasks();
    this.taskService.emitTaks();

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }
  switchStatus(i: number) {
    if(!this.tasks[i].status) {
      this.tasks[i].status = true;
    } else {
      this.tasks[i].status = false;
    }
    this.taskService.saveTaksUser();
    this.taskService.emitTaks();
  }

  onDeleteTask(task: Task) {
    this.taskService.RemoveTask(task);
  }

  // OrderByTasksWithDate() {
  //   const list = this.taskService.tasks;
  //   // console.log(list);
  //   var ref = firebase.database().ref("/tasks/");
  //   ref.orderByChild("date").on("child_added", function(snapshot) {
  //   console.log(snapshot.val().title);
  //   });
  //   // for (let i of list) {
  //   //
  //   // }
  //   // const orderbyRef = firebase.database().ref('/tasks/' + i);
  //   // // console.log(orderbyRef);
  //   // orderbyRef.orderByValue().on('value', function(snapshot) {
  //   //   snapshot.forEach(function(data) {
  //   //     console.log("Liste : " +data.val());
  //   //   });
  //   // } );
  //
  // }
  drop(event: CdkDragDrop<string[]>) {
   moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
 }

ngOnDestroy() {
  this.taskSubscription.unsubscribe();
}



}
