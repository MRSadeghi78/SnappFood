import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../login-register/services/login-register.service';
import { SnappFoodPanelSelector } from '../models/snapp-food-panel-selector';
import { PanelSelectorService } from '../services/panel-selector.service';
import { PanelSelector } from './model/panel-selector';
import { ManagersSerivce } from './services/managers.service';

@Component({
  selector: 'app-managers-panel',
  templateUrl: './managers-panel.component.html',
  styleUrls: ['./managers-panel.component.scss']
})
export class ManagersPanelComponent implements OnInit {

  constructor(public managersService: ManagersSerivce, public mainPanelSelector: PanelSelectorService, public loginRegisterService: LoginRegisterService) { }

  public async ngOnInit(): Promise<void> {
    await this.managersService.getProfile();
  }

  public panelSelector = PanelSelector.ShowFood;
  public PanelSelector = PanelSelector;

  public exit(): void {
    this.mainPanelSelector.selector = SnappFoodPanelSelector.LoginRegister;
    this.loginRegisterService.isInformationPanel = false;
  }
}
