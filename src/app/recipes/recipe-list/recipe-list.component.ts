import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService:RecipeService,
  private route:ActivatedRoute,
  private router:Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
      (recipes) => {
        this.recipes = recipes.slice();
      }
    );
  }

  newRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

}
