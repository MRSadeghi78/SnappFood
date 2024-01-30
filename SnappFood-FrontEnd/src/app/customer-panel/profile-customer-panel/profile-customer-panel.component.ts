import { Component, OnInit } from '@angular/core';
import { CustomersSerivce } from '../services/customers.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-customer-panel',
  templateUrl: './profile-customer-panel.component.html',
  styleUrls: ['./profile-customer-panel.component.scss']
})
export class ProfileCustomerPanelComponent implements OnInit {


  ngOnInit(): void {
  }


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

  public constructor(public customerService: CustomersSerivce) {}

  public onRegionClicked(region: number): void {
    this.showMap = false;
    this.customerService.customerInfo.region = region;
  }

  public async updateProfile(): Promise<void> {
    if (this.customerNameFormControl.valid && this.customerRegionFormControl.valid && this.customerAddressFormControl) {
      this.customerService.updateProfile();
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
