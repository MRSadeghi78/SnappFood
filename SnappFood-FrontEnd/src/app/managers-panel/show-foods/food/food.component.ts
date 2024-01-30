import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ManagersSerivce } from '../../services/managers.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  @Input()
  public food: Food;

  @Output()
  public clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(public managersService: ManagersSerivce) { }

  public async deleteFood(e): Promise<void> {
    e.stopPropagation();
    await this.managersService.deleteFood(this.food);
    await this.managersService.getAllFoods();
  }

  public async updateFood(e): Promise<void> {
    e.stopPropagation();
    await this.managersService.updateFood(this.food);
    await this.managersService.getAllFoods();
  }

  public click(): void {
    this.clicked.emit();
  }
}
