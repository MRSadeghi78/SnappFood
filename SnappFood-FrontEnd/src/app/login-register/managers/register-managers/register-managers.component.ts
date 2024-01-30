import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-register-managers',
  templateUrl: './register-managers.component.html',
  styleUrls: ['./register-managers.component.scss'],
})
export class RegisterManagersComponent {
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  ]);
  public hidePassword = true;

  public constructor(public loginRegisterService: LoginRegisterService) {}

  public submit(): void {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      this.loginRegisterService.isInformationPanel = true;
    }
  }
}
