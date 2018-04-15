import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing-module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],  
    imports: [
        CommonModule,
        FormsModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule{

}