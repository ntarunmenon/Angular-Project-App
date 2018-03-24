import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header-component.html'
})
export class HeaderComponent{

    @Output() clickEvent = new EventEmitter<{eventType: string}>();

    onItemClick(clickType: string){
        console.log(clickType);
        this.clickEvent.emit({
            eventType:clickType
        });
    }
}