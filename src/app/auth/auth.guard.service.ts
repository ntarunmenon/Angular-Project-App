import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import * as fromApp from '../store/app.reducers'
import * as AuthActions from '../auth/store/auth.actions'
import * as fromAuth from '../auth/store/auth.reducer'
import { Store } from "@ngrx/store";

@Injectable()
export class AuthGuard implements CanActivate {
   
   constructor(private store:Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.store.select('auth')
        .take(1)
        .map(
            (authState: fromAuth.State) => {
                return authState.authenticated;
            }
        )
    }
}