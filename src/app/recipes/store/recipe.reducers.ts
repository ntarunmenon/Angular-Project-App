import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from '../../store/app.reducers'

export interface FeatureState extends fromApp.AppState{
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes:  [
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
      ]
}
export function recipeReducer(state = initialState,action: RecipeActions.RecipeActions){
   switch(action.type){
       case (RecipeActions.SET_RECIPES):
            return {
                ... state, recipes: [...action.payload]
            }
        case (RecipeActions.ADD_RECIPE):
            return {
                ... state, 
                recipes: [... state.recipes,action.payload]
            }
        case(RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,...action.payload.UpdatedRecipe
            }
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe
            return {
                ...state,
                recipes:recipes
            };
        case(RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes]
            oldRecipes.splice(action.payload,1)
            return {
                ...state,
                recipes: oldRecipes
            }
        default:
        return state;
   }
}