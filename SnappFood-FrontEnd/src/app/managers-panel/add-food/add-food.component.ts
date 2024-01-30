import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { ManagersSerivce } from '../services/managers.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {
  public food: Food = new Food();
  constructor(public managersService: ManagersSerivce) { }

  ngOnInit(): void {
  }

  public addFood(): void {
    this.managersService.addFood(this.food);
  }

}
