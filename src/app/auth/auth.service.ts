import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token;

    constructor(private router:Router){}

    signupUser(email: string,password:string){
        console.log(email);
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .catch(
            error => console.log(error)
        );
    }

    signinUser(email: string,password:string){
        console.log(email);
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            (response:Response) => {
                firebase.auth().currentUser.getToken().then(
                    (token:string) => this.token = token
                );
                this.router.navigate(['/']);
            }
        )
        .catch(
            error => console.log(error)
        );
    }

    getToken(){
        firebase.auth().currentUser.getToken().then(
                    (token:string) => this.token = token
                );
        return this.token;
    }

    isAuthenticated(){
        return this.token != null ? true:false
    }

    logout(){
        firebase.auth().signOut();
        this.token = null;
    }
}