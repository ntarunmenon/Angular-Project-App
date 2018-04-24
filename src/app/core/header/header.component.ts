import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers"
import * as fromAuth from "../../auth/store/auth.reducer"
import * as AuthActions from "../../auth/store/auth.actions"
import * as RecipeActions from "../../recipes/store/recipe.actions"
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-header',
    templateUrl: './header-component.html'
})
export class HeaderComponent implements OnInit{
    authState: Observable<fromAuth.State>;

    constructor(private store: Store<fromApp.AppState>){}

    ngOnInit(): void {
        this.authState = this.store.select('auth');
    }
    onSaveData(){
        this.store.dispatch(new RecipeActions.StoreRecipes())
    }

    onFetchData(){
      console.log("Dispatch to Store")
      this.store.dispatch(new RecipeActions.FetchRecipes())
    }

    onLogOut(){
      this.store.dispatch(new AuthActions.Logout())
    }
}