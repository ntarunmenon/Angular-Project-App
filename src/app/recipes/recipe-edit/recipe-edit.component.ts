import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers'
import * as RecipeActions from '../store/recipe.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor (private route:ActivatedRoute,
  private router:Router,
  private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
     
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let ingredients = new FormArray([]);

    if(this.editMode){
     this.store.select('recipes')
     .take(1)
     .subscribe(
       (recipseState:fromRecipe.State) => {
          const recipe = recipseState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
              ingredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name,Validators.required),
                  'amount': new FormControl(ingredient.amount,Validators.required)
                })
              );
            }
          }
       }
     );
    }


    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'recipeDescription' : new FormControl(recipeDescription,Validators.required),
      'ingredients':ingredients
    });
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.recipeDescription,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );

    if(this.editMode){
      this.store.dispatch(new RecipeActions.UpdateRecipe(
        {index:this.id,
        UpdatedRecipe:recipe
      }))
    }else{
      this.store.dispatch(new RecipeActions.AddRecipe(recipe))
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,Validators.required)
      })
    );
  }

  onDeleteIngredient(index){
    console.log(this.recipeForm);
    console.log(index);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel(){
    this.router.navigate(['recipes']);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
