import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent {
  @Input()
  public food: Food;

  public comments: { text: string; response: string }[] = [
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: '',
    },
    {
      text: 'slm',
      response: '',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
    {
      text: 'slm',
      response: 'dorod',
    },
  ];
}
