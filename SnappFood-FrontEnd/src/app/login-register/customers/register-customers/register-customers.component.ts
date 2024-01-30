import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-register-customers',
  templateUrl: './register-customers.component.html',
  styleUrls: ['./register-customers.component.scss']
})
export class RegisterCustomersComponent {

  public phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/09[0-9]{9}/),
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  ]);
  public hidePassword = true;

  constructor(public loginRegisterService: LoginRegisterService) { }

  public submit(): void {
    if (this.phoneFormControl.valid && this.passwordFormControl.valid) {
      this.loginRegisterService.isInformationPanel = true;
    }
  }
}
