import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthGuard } from "./auth/auth.guard.service";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";

const appRoutes: Routes=[
    {path: '',redirectTo: '/recipes',pathMatch: 'full'}
  ]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}