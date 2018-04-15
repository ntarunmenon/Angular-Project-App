import { Component, Output, EventEmitter } from "@angular/core";
import { DataStorageService } from "../shared/datastorage.service";
import { Http,Headers,Response } from "@angular/http";


@Component({
    selector: 'app-header',
    templateUrl: './header-component.html'
})
export class HeaderComponent{

    constructor(private dataStorageService: DataStorageService){}
    
    @Output() clickEvent = new EventEmitter<{eventType: string}>();

    onItemClick(clickType: string){
        console.log(clickType);
        this.clickEvent.emit({
            eventType:clickType
        });
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
}