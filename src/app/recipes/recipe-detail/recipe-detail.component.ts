import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id:number;

  constructor(private recipeService:RecipeService,
  private route: ActivatedRoute,
  private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id= +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  sendToShoppingList(){
   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    console.log('inside edit');
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

}
