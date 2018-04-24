import { Actions, Effect } from "@ngrx/effects";
import * as RecipeActions from '../store/recipe.actions'
import { Http,Response } from "@angular/http";
import { Recipe } from "../recipe.model";
import * as fromRecipe from '../store/recipe.reducers';
import * as fromAuth from '../../auth/store/auth.reducer'
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/take';


@Injectable()
export class RecipeEffects{

    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(
        (action: RecipeActions.FetchRecipes) => {
            return this.store.select('auth')
            .take(1)
            .switchMap(
                (authState: fromAuth.State) => {
                    console.log("Getting Token and ");
                    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-c1ce0.firebaseio.com/recipes.json?auth='
                    +authState.token)
                }
            ).map(
                (recipes) => {
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipeActions.SET_RECIPES,
                        payload:recipes
                    };
                }
            )
        }
    );

    @Effect({dispatch:false})
    recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(
        this.store.select('recipes')
    )
    .switchMap (
        ([action,state]) => {
            return this.store.select('auth')
            .take(1)
            .switchMap(
                (authState: fromAuth.State) => {
                    return this.httpClient.put('https://ng-recipe-book-c1ce0.firebaseio.com/recipes.json?auth=' 
                    + authState.token
                    ,state.recipes)
                }
            )
        }
    )

    constructor(private actions$: Actions,
        private httpClient:HttpClient,
        private store:Store<fromRecipe.FeatureState>){}
}