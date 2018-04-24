import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() recipeIndex: number;

  constructor(
  private router:Router,
  private route:ActivatedRoute) { }

  ngOnInit() {
  }
}
