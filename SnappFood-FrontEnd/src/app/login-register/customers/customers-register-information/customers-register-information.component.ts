import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnappFoodPanelSelector } from '../../../models/snapp-food-panel-selector';
import { PanelSelectorService } from '../../../services/panel-selector.service';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-customers-register-information',
  templateUrl: './customers-register-information.component.html',
  styleUrls: ['./customers-register-information.component.scss'],
})
export class CustomersRegisterInformationComponent {
  public showMap = false;
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

  public constructor(public loginRegisterService: LoginRegisterService, public panelSelector: PanelSelectorService) {
  }

  public onRegionClicked(region: number): void {
    this.showMap = false;
    this.loginRegisterService.customerRegister.region = region;
  }

  public async register(): Promise<void> {
    if (this.customerNameFormControl.valid && this.customerRegionFormControl.valid && this.customerAddressFormControl) {
      await this.loginRegisterService.registerCustomer();
      this.panelSelector.selector = SnappFoodPanelSelector.Customer;
    }
  }

  public customerNameFormControl = new FormControl('', [
    Validators.required
  ]);

  public customerRegionFormControl = new FormControl('', [
    Validators.required
  ]);

  public customerAddressFormControl = new FormControl('', [
    Validators.required
  ]);
}
