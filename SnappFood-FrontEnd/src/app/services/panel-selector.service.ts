import { Injectable } from '@angular/core';
import { SnappFoodPanelSelector } from '../models/snapp-food-panel-selector';

@Injectable()
export class PanelSelectorService {
  public selector = SnappFoodPanelSelector.LoginRegister;
  public SnappFoodPanelSelector = SnappFoodPanelSelector;
}
