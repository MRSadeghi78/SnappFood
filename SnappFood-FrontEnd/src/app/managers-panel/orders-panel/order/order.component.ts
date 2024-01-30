import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ManagersSerivce } from '../../services/managers.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input()
  public order: Order;

  @Output()
  public clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(public managersService: ManagersSerivce) { }

  public async acceptOrder(e): Promise<void> {
    e.stopPropagation();
    this.order.situation = 'Preparing';
    this.managersService.acceptOrder(this.order);
  }

  public click(): void {
    this.clicked.emit();
  }
}
