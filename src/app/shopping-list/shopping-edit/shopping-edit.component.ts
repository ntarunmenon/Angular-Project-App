import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService:ShoppingListService) { }


  ngOnInit() {
  }

  addNewIngredient(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingInput = this.amountInputRef.nativeElement.value;
    this.shoppingListService.addIngredient(new Ingredient(ingName,ingInput));
  }
}
