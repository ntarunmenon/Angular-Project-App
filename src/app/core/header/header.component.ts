import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { DataStorageService } from "../../shared/datastorage.service";
import { Http,Headers,Response } from "@angular/http";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers"
import * as fromAuth from "../../auth/store/auth.reducer"
import * as AuthActions from "../../auth/store/auth.actions"
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-header',
    templateUrl: './header-component.html'
})
export class HeaderComponent implements OnInit{
    authState: Observable<fromAuth.State>;

    constructor(private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>){}

    ngOnInit(): void {
        this.authState = this.store.select('auth');
    }
    onSaveData(){
        this.dataStorageService.storeRecipes()
        .subscribe(
            (response: Response) => {
                console.log(response.json());
            }
        );
    }

    onFetchData(){
        this.dataStorageService.getRecipes();
    }

    onLogOut(){
      this.store.dispatch(new AuthActions.Logout())
    }
}