import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action'
import * as fromApp from '../../store/app.reducers'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1){
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }else{
          this.editMode = false;
        }
      }
    );
  }

  onAddItem(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        {
          ingredient: newIngredient
        }
      ));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }


  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEditIngredient())
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.slForm.reset();
    this.editMode = false;
  }
}
