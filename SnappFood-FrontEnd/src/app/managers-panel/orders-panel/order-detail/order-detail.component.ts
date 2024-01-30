import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Food } from 'src/app/models/food';
import { ManagersSerivce } from '../../services/managers.service';
import { OrderPanelService } from '../services/order-panel.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  @Input()
  public order: Order;

  constructor(public managersService: ManagersSerivce, public orderPanelService: OrderPanelService) { }

  public foods: Food[] = [
    {
      name: "پیتزا",
      price: 10000,
      discription: "توضیح پیتزا",
      isEnable: false,
    },
  ];

  public async acceptOrder(): Promise<void> {
    this.order.situation = 'Preparing';
    this.managersService.acceptOrder(this.order);
  }

  public async return(): Promise<void> {
    this.orderPanelService.isOrderPanelDetail = false;
  }
}
