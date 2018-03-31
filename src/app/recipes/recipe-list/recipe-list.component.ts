import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 
  recipes: Recipe[];

  constructor(private recipseService:RecipeService,
  private route:ActivatedRoute,
  private router:Router) { }

  ngOnInit() {
    this.recipes = this.recipseService.getRecipes();
  }

  newRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }

}
