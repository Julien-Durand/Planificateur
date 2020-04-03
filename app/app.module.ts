import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-list/task-form/task-form.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepasListComponent } from './repas-list/repas-list.component';
import { RepasFormComponent } from './repas-list/repas-form/repas-form.component';
import { RepasFormUpdateComponent } from './repas-list/repas-form-update/repas-form-update.component';



const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'home', canActivate: [AuthGuardService], component: MainComponent },
  { path : '', redirectTo: 'home', pathMatch: 'full' },
  { path : '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    TaskListComponent,
    TaskFormComponent,
    MainComponent,
    RepasListComponent,
    RepasFormComponent,
    RepasFormUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [RepasFormComponent, RepasFormUpdateComponent]
})
export class AppModule { }
