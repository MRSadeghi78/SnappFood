import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OutOrderModel } from '../../model/out-order-model';
import { CustomersSerivce } from '../../services/customers.service';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent {

  @Input()
  public order: Order;

  constructor(public customersSerivce: CustomersSerivce) {}

  public orderFoods(): void {
    let outOrderModels: OutOrderModel = {foodIds: []};
    this.order.foods.forEach(function (f) {
      outOrderModels.foodIds.push(f.id);
    });
    this.customersSerivce.orderFoods(outOrderModels);
  }

}
