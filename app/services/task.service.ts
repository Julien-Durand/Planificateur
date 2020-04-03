import { Injectable } from '@angular/core';
import { Task } from '../models/Task.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  taskSubject = new Subject<Task[]>();


  constructor() {
  this.getTasks();
  }

  emitTaks() {
    this.taskSubject.next(this.tasks);
  }

  getUserId() {
    const userNow = firebase.auth().currentUser;
    if( userNow != null){
        const uid = userNow.uid;
        return uid;
    }
  }

  saveTaksUser() {
    const uid = this.getUserId();
    firebase.database().ref(uid+'/tasks').set(this.tasks);
  }


  getTasks() {
    const uid = this.getUserId();
    firebase.database().ref(uid+'/tasks')
    .on('value', (data: DataSnapshot) => {
      this.tasks = data.val() ? data.val() : [];
      this.emitTaks();
    });
  }

  // getSingleTask(id: number) {
  //   return new Promise(
  //     (resolve, reject) => {
  //       firebase.database().ref('/tasks/' + id).once('value').then(
  //         (data: DataSnapshot) => {
  //           resolve(data.val());
  //         }, (error) => {
  //           reject(error);
  //         }
  //       );
  //     }
  //   );
  // }

  createNewTask(newTask: Task) {
    this.tasks.push(newTask);
    this.saveTaksUser();
    this.emitTaks();
  }

  RemoveTask(task: Task) {
    const taskIndexToRemove = this.tasks.findIndex(
      (taskEl) => {
        if(taskEl === task) {
          return true;
        }
      }
    );
    this.tasks.splice(taskIndexToRemove, 1);
    this.saveTaksUser();
    this.emitTaks();
  }






}
