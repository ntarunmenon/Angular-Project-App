import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{

    constructor(private shoppingListService:ShoppingListService) { }
    
    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
        'Recipe for Tasty Schnitzel',
        'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.nDYDBIpK1ynQLqBAogi47gHaE8%26pid%3D15.1&f=1'
        , [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',20)
        ]),
        new Recipe('Juicy Burger',
         'Recipe for Juicy Burger',
         'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F_r4rluMJnrjI%2FS8enLFMzEcI%2FAAAAAAAAACA%2FukgFXweKZuc%2Fs1600%2Fhamburger1.jpg&f=1',
          [
            new Ingredient('Meat',1),
            new Ingredient('Bun',2)
          ]
        )
      ];

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipeById(id: number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): any {
        this.shoppingListService.addIngredients(ingredients);
      }
}