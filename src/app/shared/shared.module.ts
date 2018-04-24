import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./directive.dropdown";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations:[
        DropdownDirective
    ],
    exports:[
        CommonModule,
        DropdownDirective,
        HttpClientModule
    ]
})
export class SharedModule{

}