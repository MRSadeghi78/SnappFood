import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { CustomersSerivce } from '../services/customers.service';

@Component({
  selector: 'app-foods-customer-panel',
  templateUrl: './foods-customer-panel.component.html',
  styleUrls: ['./foods-customer-panel.component.scss'],
})
export class FoodsCustomerPanelComponent implements OnInit {

  constructor(public customersSerivce: CustomersSerivce) {}

  public ngOnInit(): void {
    // this.customersSerivce.getAllFoods();
  }
}
