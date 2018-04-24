import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { DropdownDirective } from "../shared/directive.dropdown";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RecipeRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { recipeReducer } from "./store/recipe.reducers";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects } from "./store/recipe.effects";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipeRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipes',recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ]
})
export class RecipesModule{
    
}