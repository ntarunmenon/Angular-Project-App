import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ActivatedRouteSnapshot, ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action'
import * as fromRecipe from '../store/recipe.reducers'
import * as RecipeActions from '../store/recipe.actions'


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  id:number;

  constructor(
  private route: ActivatedRoute,
  private router:Router,
  private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id= +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  sendToShoppingList(){
    this.store.select('recipes')
    .take(1)
    .subscribe(
      (recipeState: fromRecipe.State) =>{
        this.store.dispatch(new ShoppingListActions.AddIngredients
          (recipeState.recipes[this.id].ingredients));
      }
    );
   
  }

  onEditRecipe(){
    console.log('inside edit');
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
   this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
