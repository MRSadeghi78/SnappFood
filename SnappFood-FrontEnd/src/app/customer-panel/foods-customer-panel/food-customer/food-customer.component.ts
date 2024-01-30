import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Food } from 'src/app/models/food';
import { OutOrderModel } from '../../model/out-order-model';
import { CustomersSerivce } from '../../services/customers.service';

@Component({
  selector: 'app-food-customer',
  templateUrl: './food-customer.component.html',
  styleUrls: ['./food-customer.component.scss'],
})
export class FoodCustomerComponent {
  @Input()
  public food: Food;
  @Output()
  public clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(public customersSerivce: CustomersSerivce) {}

  public click(): void {
    this.clicked.emit();
  }

  public orderFood(): void {
    let outOrderModel: OutOrderModel = {foodIds : [this.food.id]};
    this.customersSerivce.orderFoods(outOrderModel);
  }
}
