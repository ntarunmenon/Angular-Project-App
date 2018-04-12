import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(private shoppingListService:ShoppingListService) { }


  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (i) => {
        this.editMode = true;
        this.editedItemIndex = i;
        this.editedItem = this.shoppingListService.getIngredientsByIndex(i);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.shoppingListService.addIngredient(
        newIngredient
      );
    }
    this.editMode = false;
    form.reset();
  }


  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }
}
