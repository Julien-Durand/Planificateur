import { Injectable } from '@angular/core';
import { Repas } from '../models/repas.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class RepasService {

  repas: Repas[] =[];
  repasSubject = new Subject<Repas[]>();
  listJours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  listMoments = ['Midi', 'Dîner'];

  constructor() { }

  emitRepas() {
    this.repasSubject.next(this.repas);
  }

  getUserId() {
    const userNow = firebase.auth().currentUser;
    if( userNow != null){
        const uid = userNow.uid;
        return uid;
    }
  }

  saveUserRepas() {
    const uid = this.getUserId();
    firebase.database().ref(uid+'/repas').set(this.repas);
  }

  getRepas() {
    const uid = this.getUserId();
    firebase.database().ref(uid+'/repas')
    .on('value', (data: DataSnapshot) => {
      this.repas = data.val() ? data.val() : [];
      this.emitRepas();
    });
  }

  getSingleRepas(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/repas/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  updateRepas(id: number, updateRepas: Repas){
    const uid = this.getUserId();
    firebase.database().ref(uid+'/repas/' + id).set(updateRepas);
  }

  createNewRepas(newRepas: Repas) {
    this.repas.push(newRepas);
    this.saveUserRepas();
    this.emitRepas();
  }

  RemoveRepas(therepas: Repas) {
    const repasIndexToRemove = this.repas.findIndex(
      (repasEl) => {
        if(repasEl === therepas) {
          return true;
        }
      }
    );
    this.repas.splice(repasIndexToRemove, 1);
    this.saveUserRepas();
    this.emitRepas();
  }













}
