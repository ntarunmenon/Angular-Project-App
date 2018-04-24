import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipesState: Observable<fromRecipe.State>;


  constructor(
  private route:ActivatedRoute,
  private router:Router,
  private store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  newRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }
}
