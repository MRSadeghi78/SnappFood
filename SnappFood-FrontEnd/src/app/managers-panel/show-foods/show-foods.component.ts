import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ManagersSerivce } from '../services/managers.service';

@Component({
  selector: 'app-show-foods',
  templateUrl: './show-foods.component.html',
  styleUrls: ['./show-foods.component.scss']
})
export class ShowFoodsComponent implements OnInit {
  public isFoodPanelDetail = false;
  public foodDetail: Food;

  constructor(public managersService: ManagersSerivce) { }

  ngOnInit(): void {
    this.managersService.getAllFoods();
  }

  public onFoodClick(foodNumber: number): void {
    this.isFoodPanelDetail = true;

    this.foodDetail = this.managersService.foods[foodNumber];
  }
}
