import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ManagersSerivce } from '../services/managers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public showMap = false;
  public coveredRegionMap = false;
  public toppings: FormControl = new FormControl([]);
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

  public constructor(public managersService: ManagersSerivce) {
  }

  public async ngOnInit(): Promise<void> {
    await this.managersService.getProfile();
    this.toppings.setValue(this.managersService.restaurantInformation.coveredRegions);
  }


  public getTrigerReionsText(): string {
    if (!this.toppings || !this.toppings.value) {
      return '';
    }

    const viewValues = [];
    this.managersService.restaurantInformation.coveredRegions =
      this.toppings.value;

    this.toppings.value.forEach((value) => {
      const viewValue = this.getViewValue(value);

      viewValues.push(viewValue);
    });

    return viewValues.join('، ');
  }

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
      this.managersService.restaurantInformation.restaurantRegion = region;
    }
  }

  private getViewValue(value: number): string {
    return this.regions.find((x) => x.value === value).viewValue;
  }

  public updateManagerProfile(): void {
    this.managersService.updateProfile();
  }
}
