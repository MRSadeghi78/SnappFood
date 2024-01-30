import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ManagersSerivce } from '../services/managers.service';
import { OrderPanelService } from './services/order-panel.service';

@Component({
  selector: 'app-orders-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.scss'],
})
export class OrdersPanelComponent implements OnInit {
  // public isOrderPanelDetail = false;
  public orderDetail: Order;

  constructor(public managersSerivce: ManagersSerivce, public orderPanelService: OrderPanelService) {}

  ngOnInit(): void {
    this.managersSerivce.getAllOrders();
    console.log(this.managersSerivce.orders);
    this.orderPanelService.isOrderPanelDetail = false;
  }

  public onOrderClick(orderNumber: number): void {
    // this.isOrderPanelDetail = true;
    this.orderPanelService.isOrderPanelDetail = true;

    this.orderDetail = this.managersSerivce.orders[orderNumber];
  }
}
