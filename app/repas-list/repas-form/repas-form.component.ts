import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepasService } from '../../services/repas.service';
import { Repas } from '../../models/repas.model';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-repas-form',
  templateUrl: './repas-form.component.html',
  styleUrls: ['./repas-form.component.scss']
})
export class RepasFormComponent implements OnInit {

  repasForm: FormGroup;
  jours = this.repasService.listJours;
  moments = this.repasService.listMoments;

  constructor(private formBuilder: FormBuilder,
              private repasService: RepasService,
              private dialogRef: MatDialogRef<RepasFormComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.repasForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        // description: ['', Validators.required],
        jour: ['', Validators.required],
        moment: ['', Validators.required]
      }
    );
  }

  onSaveRepas() {
    const name = this.repasForm.get('name').value;
    const jour = this.repasForm.get('jour').value;
    const moment = this.repasForm.get('moment').value;
    const newRepas = new Repas(name,jour,moment);
    this.repasService.createNewRepas(newRepas);
    this.dialogRef.close();
  }

}
