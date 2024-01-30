import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from './services/login-register.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent {
  public constructor(public loginRegisterService: LoginRegisterService) {
  }

  public changeButtonClicked(): void {
    this.loginRegisterService.isManager = !this.loginRegisterService.isManager;
  }
}
