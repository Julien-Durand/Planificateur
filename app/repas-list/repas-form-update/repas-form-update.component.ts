import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepasService } from '../../services/repas.service';
import { Repas } from '../../models/repas.model';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-repas-form-update',
  templateUrl: './repas-form-update.component.html',
  styleUrls: ['./repas-form-update.component.scss']
})
export class RepasFormUpdateComponent implements OnInit {

  updateRepasForm: FormGroup;
  jours = this.repasService.listJours;
  moments = this.repasService.listMoments;

  constructor(private formBuilder: FormBuilder,
              private repasService: RepasService,
              private dialogRef: MatDialogRef<RepasFormUpdateComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.updateRepasForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        jour: ['', Validators.required],
        moment: ['', Validators.required]
      }
    );
  }

  onSaveUpdateRepas(id : number) {
    const name = this.updateRepasForm.get('name').value;
    const jour = this.updateRepasForm.get('jour').value;
    const moment = this.updateRepasForm.get('moment').value;
    const newRepas = new Repas(name,jour,moment);
    this.repasService.updateRepas(id, newRepas);
    this.repasService.getRepas();
    this.repasService.emitRepas();
    this.dialogRef.close();
  }


}
