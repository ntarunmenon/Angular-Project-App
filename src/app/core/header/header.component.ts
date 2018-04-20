import { Component, Output, EventEmitter } from "@angular/core";
import { DataStorageService } from "../../shared/datastorage.service";
import { Http,Headers,Response } from "@angular/http";
import { AuthService } from "../../auth/auth.service";


@Component({
    selector: 'app-header',
    templateUrl: './header-component.html'
})
export class HeaderComponent{

    constructor(private dataStorageService: DataStorageService,
    private authService:AuthService){}
    

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
        this.authService.logout();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
      }
}