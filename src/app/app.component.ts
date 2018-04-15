import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyDV3w7R3QWQAx8JH0rvbzlNxWBZh4HWa7M",
      authDomain: "ng-recipe-book-c1ce0.firebaseapp.com"
    })
  }
  title = 'app';
  showSection:string = 'Recipes';

  getClickEvent(clickEvent){
    this.showSection=clickEvent.eventType;
  }
}
