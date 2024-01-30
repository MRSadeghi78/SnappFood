import { Component, OnInit } from '@angular/core';
import { CustomersSerivce } from '../services/customers.service';

@Component({
  selector: 'app-orders-customer-panel',
  templateUrl: './orders-customer-panel.component.html',
  styleUrls: ['./orders-customer-panel.component.scss']
})
export class OrdersCustomerPanelComponent implements OnInit {

  constructor(public customersSerivce: CustomersSerivce) {}

  public ngOnInit(): void {
    this.customersSerivce.getAllOrders();
  }

}
