import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagersSerivce } from '../../../managers-panel/services/managers.service';
import { SnappFoodPanelSelector } from '../../../models/snapp-food-panel-selector';
import { PanelSelectorService } from '../../../services/panel-selector.service';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-managers-register-information',
  templateUrl: './managers-register-information.component.html',
  styleUrls: ['./managers-register-information.component.scss'],
})
export class ManagersRegisterInformationComponent {
  public showMap = false;
  public coveredRegionMap = false;
  public regions: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'منطقه ۱' },
    { value: 2, viewValue: 'منطقه ۲' },
    { value: 3, viewValue: 'منطقه ۳' },
    { value: 4, viewValue: 'منطقه ۴' },
    { value: 5, viewValue: 'منطقه ۵' },
    { value: 6, viewValue: 'منطقه ۶' },
    { value: 7, viewValue: 'منطقه ۷' },
    { value: 8, viewValue: 'منطقه ۸' },
    { value: 9, viewValue: 'منطقه ۹' },
    { value: 10, viewValue: 'منطقه ۱۰' },
    { value: 11, viewValue: 'منطقه ۱۱' },
    { value: 12, viewValue: 'منطقه ۱۲' },
    { value: 13, viewValue: 'منطقه ۱۳' },
    { value: 14, viewValue: 'منطقه ۱۴' },
    { value: 15, viewValue: 'منطقه ۱۵' },
    { value: 16, viewValue: 'منطقه ۱۶' },
    { value: 17, viewValue: 'منطقه ۱۷' },
    { value: 18, viewValue: 'منطقه ۱۸' },
    { value: 19, viewValue: 'منطقه ۱۹' },
    { value: 20, viewValue: 'منطقه ۲۰' },
    { value: 21, viewValue: 'منطقه ۲۱' },
    { value: 22, viewValue: 'منطقه ۲۲' },
  ];
  public toppings: FormControl = new FormControl('', [
    Validators.required
  ]);
  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public constructor(public loginRegisterService: LoginRegisterService, public panelSelector: PanelSelectorService, public managersService: ManagersSerivce) {}

  public onRegionClicked(region: number): void {
    if (this.coveredRegionMap) {
      let value: any[] = this.toppings.value;
      if (!value) {
        value = [];
      }

      if (value.includes(region)) {
        value.forEach((element, index) => {
          if (element === region) {
            value.splice(index, 1);
          }
        });
      } else {
        value.push(region);
      }

      this.toppings.setValue(value);
    } else {
      this.showMap = false;
      this.loginRegisterService.managerRegister.restaurantRegion = region;
    }
  }

  public getTrigerReionsText(): string {
    if (!this.toppings || !this.toppings.value) {
      return '';
    }

    const viewValues = [];
    this.loginRegisterService.managerRegister.coveredRegions =
      this.toppings.value;

    this.toppings.value.forEach((value) => {
      const viewValue = this.getViewValue(value);

      viewValues.push(viewValue);
    });

    return viewValues.join('، ');
  }

  public async register(): Promise<void> {
    if (this.toppings.valid
       && this.restaurantNameFormControl.valid
       && this.restaurantRegionFormControl.valid
       && this.addressFormControl.valid
       && this.startTimeFormControl.valid
       && this.endTimeFormControl.valid
       && this.sendFoodTimeFormControl.valid
       && this.sendFoodPriceFormControl.valid) {
      await this.loginRegisterService.registerManager();
      this.panelSelector.selector = SnappFoodPanelSelector.Manager;
      await this.managersService.getProfile();
    }
  }

  private getViewValue(value: number): string {
    return this.regions.find((x) => x.value === value).viewValue;
  }

  public restaurantNameFormControl = new FormControl('', [
    Validators.required
  ]);

  public restaurantRegionFormControl = new FormControl('', [
    Validators.required
  ]);

  public addressFormControl = new FormControl('', [
    Validators.required
  ]);

  public startTimeFormControl = new FormControl('', [
    Validators.required
  ]);

  public endTimeFormControl = new FormControl('', [
    Validators.required
  ]);

  public sendFoodTimeFormControl = new FormControl('', [
    Validators.required
  ]);

  public sendFoodPriceFormControl = new FormControl('', [
    Validators.required
  ]);
}
