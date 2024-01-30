import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../login-register/services/login-register.service';
import { SnappFoodPanelSelector } from '../models/snapp-food-panel-selector';
import { PanelSelectorService } from '../services/panel-selector.service';
import { CustomerPanelSelector } from './model/customer-panel-selector';
import { CustomersSerivce } from './services/customers.service';

@Component({
  selector: 'app-customer-panel',
  templateUrl: './customer-panel.component.html',
  styleUrls: ['./customer-panel.component.scss']
})
export class CustomerPanelComponent implements OnInit {
  // public panelSelector: CustomerPanelSelector = CustomerPanelSelector.Foods;
  public CustomerPanelSelector = CustomerPanelSelector;

  constructor(public mainPanelSelector: PanelSelectorService, public customersSerivce: CustomersSerivce, public loginRegisterService: LoginRegisterService) { }

  public ngOnInit(): void {
    this.customersSerivce.getProfile();
  }

  public showFoods(): void {
    this.customersSerivce.panelSelector = CustomerPanelSelector.Foods;
    this.customersSerivce.getAllFoods();
  }

  public exit(): void {
    this.mainPanelSelector.selector = SnappFoodPanelSelector.LoginRegister;
    this.loginRegisterService.isInformationPanel = false;
  }
}
