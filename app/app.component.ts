import { Component } from '@angular/core';
import * as firebase from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Planificateur';

  constructor() {
    var firebaseConfig = {
    apiKey: "AIzaSyBjVM4fu59IhPxxTi7OhXwqy0vYmh9-EGQ",
    authDomain: "planificateur-project.firebaseapp.com",
    databaseURL: "https://planificateur-project.firebaseio.com",
    projectId: "planificateur-project",
    storageBucket: "planificateur-project.appspot.com",
    messagingSenderId: "170682024920",
    appId: "1:170682024920:web:f44944b9b77a7b7db0a8ad",
    measurementId: "G-VTG9260NDL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }

}
