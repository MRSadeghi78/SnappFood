import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CustomerLogin } from '../models/customers/customer-login';
import { CustomerRegister } from '../models/customers/customer-register';
import { ManagerLogin } from '../models/managers/manager-login';
import { ManagerRegister } from '../models/managers/manager-register';

@Injectable()
export class LoginRegisterService {
  public customerLogin: CustomerLogin;
  public customerRegister: CustomerRegister;
  public managerLogin: ManagerLogin;
  public managerRegister: ManagerRegister;
  public isManager = false;
  public isInformationPanel = false;

  public constructor(private httpService: HttpService) {
    this.customerLogin = new CustomerLogin();
    this.customerRegister = new CustomerRegister();
    this.managerLogin = new ManagerLogin();
    this.managerRegister = new ManagerRegister();
  }

  public async loginManager(): Promise<void> {
    const result = await this.httpService.post('https://localhost:5001/Manager/Login', this.managerLogin);
    localStorage.setItem('token', result.token);
  }

  public async registerManager(): Promise<void> {
    const result = await this.httpService.post('https://localhost:5001/Manager/Register', this.managerRegister);
    localStorage.setItem('token', result.token);

  }

  public async loginCustomer(): Promise<void> {
    const result = await this.httpService.post('https://localhost:5001/Customer/Login', this.customerLogin);
    localStorage.setItem('token', result.token);
  }

  public async registerCustomer(): Promise<void> {
    const result = await this.httpService.post('https://localhost:5001/Customer/Register', this.customerRegister);
    localStorage.setItem('token', result.token);
  }
}
