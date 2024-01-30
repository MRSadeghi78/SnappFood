import { Component, OnInit } from '@angular/core';
import { CustomerPanelSelector } from '../model/customer-panel-selector';
import { CustomersSerivce } from '../services/customers.service';

@Component({
  selector: 'app-search-food',
  templateUrl: './search-food.component.html',
  styleUrls: ['./search-food.component.scss']
})
export class SearchFoodComponent implements OnInit {

  public restaurantName: string = null;
  public restaurantRegion: number = null;
  public foodName: string = null;

  constructor(public customersService: CustomersSerivce) { }

  ngOnInit(): void {
  }

  public search(): void {
    this.customersService.search(this.restaurantName, this.restaurantRegion, this.foodName);
    this.customersService.panelSelector = CustomerPanelSelector.Foods;
  }

}
