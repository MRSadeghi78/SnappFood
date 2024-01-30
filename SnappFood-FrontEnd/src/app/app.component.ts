import { Component } from '@angular/core';
import { SnappFoodPanelSelector } from './models/snapp-food-panel-selector';
import { PanelSelectorService } from './services/panel-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public SnappFoodPanelSelector = SnappFoodPanelSelector;

  public constructor(public panelSelector: PanelSelectorService) {
  }

  public regionClicked(region: number): void {
    console.log(region);
  }
}
