import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import 'rxjs/Rx';
import { Recipe } from "../recipes/recipe.model";
import * as fromApp from '../store/app.reducers'
import * as fromAuth from '../auth/store/auth.reducer'
import { Store } from "@ngrx/store";

@Injectable()
export class DataStorageService{

    constructor(private http:Http,
        private recipeService: RecipeService
        ,private store:Store<fromApp.AppState>){}

    storeRecipes(){
        
       return this.store.select('auth')
       .take(1)
       .switchMap(
            (authState: fromAuth.State) => {
                return this.http.put('https://ng-recipe-book-c1ce0.firebaseio.com/recipes.json?auth=' 
                + authState.token
                ,this.recipeService.getRecipes())
            }
        );
    }

    getRecipes(){
        return this.store.select('auth')
        .take(1)
        .switchMap(
            (authState: fromAuth.State) => {
                return this.http.get('https://ng-recipe-book-c1ce0.firebaseio.com/recipes.json?auth='+authState.token)
            }
        ).map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes:Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}