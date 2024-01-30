import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnappFoodPanelSelector } from '../../../models/snapp-food-panel-selector';
import { PanelSelectorService } from '../../../services/panel-selector.service';
import { LoginRegisterService } from '../../services/login-register.service';
@Component({
  selector: 'app-login-customers',
  templateUrl: './login-customers.component.html',
  styleUrls: ['./login-customers.component.scss']
})
export class LoginCustomersComponent {

  public phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/09[0-9]{9}/),
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  public hidePassword = true;

  constructor(public loginRegisterService: LoginRegisterService, public panelSelector: PanelSelectorService) { }

  public async login(): Promise<void> {
    if (this.phoneFormControl.valid && this.passwordFormControl.valid) {
      await this.loginRegisterService.loginCustomer();
      this.panelSelector.selector = SnappFoodPanelSelector.Customer;
    }
  }
}
