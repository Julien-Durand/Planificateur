import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RepasService } from '../services/repas.service';
import { Repas } from '../models/Repas.model';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { RepasFormComponent } from './repas-form/repas-form.component';
import { RepasFormUpdateComponent } from './repas-form-update/repas-form-update.component';
@Component({
  selector: 'app-repas-list',
  templateUrl: './repas-list.component.html',
  styleUrls: ['./repas-list.component.scss']
})
export class RepasListComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  repas: Repas[];
  repasSubscription: Subscription;
  jours = this.repasService.listJours;
  moments = this.repasService.listMoments;

  constructor(private repasService: RepasService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.repasSubscription = this.repasService.repasSubject.subscribe(
      (repas: Repas[]) => {
        this.repas = repas;
      }
    );
    this.repasService.getRepas();
    this.repasService.emitRepas();

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

  onDeleteRepas(repas: Repas) {
    this.repasService.RemoveRepas(repas);
  }

  RemoveAllRepas() {
    const uid = this.repasService.getUserId();
    const repasRef = firebase.database().ref(uid+'/repas');
    repasRef.remove();
    this.repasService.getRepas();
    this.repasService.emitRepas();
  }

  openDialog() {
    this.dialog.open(RepasFormComponent);
  }

  openUpdateDialog(repas : Repas) {
    const indexrepas = this.repas.findIndex(
      (repasEl) =>{
        if(repasEl === repas) {
          return true;
        }
      }
    );
    this.dialog.open(RepasFormUpdateComponent, {
      data : {name : repas.name, jour : repas.jour, moment : repas.moment, id : indexrepas }
    });
  }

  ngOnDestroy() {
    this.repasSubscription.unsubscribe();
  }



}
