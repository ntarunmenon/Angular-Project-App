import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./directive.dropdown";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        DropdownDirective
    ],
    exports:[
        CommonModule,
        DropdownDirective
    ]
})
export class SharedModule{

}