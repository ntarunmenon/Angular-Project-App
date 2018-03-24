import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showSection:string = 'Recipes';

  getClickEvent(clickEvent){
    this.showSection=clickEvent.eventType;
  }
}
