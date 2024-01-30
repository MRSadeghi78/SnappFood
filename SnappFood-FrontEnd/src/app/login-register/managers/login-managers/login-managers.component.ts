import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnappFoodPanelSelector } from '../../../models/snapp-food-panel-selector';
import { PanelSelectorService } from '../../../services/panel-selector.service';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-login-managers',
  templateUrl: './login-managers.component.html',
  styleUrls: ['./login-managers.component.scss']
})
export class LoginManagersComponent {
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  public hidePassword = true;

  public constructor(public loginRegisterService: LoginRegisterService, public panelSelector: PanelSelectorService) {
  }

  public async login(): Promise<void> {
    if (this.emailFormControl.valid && this.passwordFormControl.valid){
      await this.loginRegisterService.loginManager();
      this.panelSelector.selector = SnappFoodPanelSelector.Manager;
    }
  }
}
