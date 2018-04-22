import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../store/app.reducers'
import * as AuthActions from '../store/auth.actions'
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    console.log(form);
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignIn({username:email,password:password}))
  }

}
