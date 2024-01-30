import { Injectable } from "@angular/core";
import { Food } from "../../models/food";
import { Order } from "../../models/order";
import { HttpService } from "../../services/http.service";
import { CustomerInfo } from "../model/customer-info";
import { CustomerPanelSelector } from "../model/customer-panel-selector";
import { OutOrderModel } from "../model/out-order-model";

@Injectable()
export class CustomersSerivce {

  public foods: Food[] = [];
  public orders: Order[] = [];
  public customerInfo: CustomerInfo;
  public panelSelector: CustomerPanelSelector = CustomerPanelSelector.Foods;

  constructor(private httpService: HttpService) {}

  public async getAllFoods(): Promise<void> {
    // this.foods = [
    //   {
    //   name: 'قرمه سبزی',
    //   restaurant: 'حسام اینا',
    //   id: 'a',
    //   price: 5000,
    //   discription:
    //     'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //   isEnable: true,
    //   },
    //   {
    //   name: 'جوجه',
    //   restaurant: 'حسام اینا',
    //   id: 'b',
    //   price: 5000,
    //   discription:
    //     'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //   isEnable: true,
    //   },
    //   {
    //   name: 'کوبیده',
    //   restaurant: 'حسام اینا',
    //   id: 'c',
    //   price: 5000,
    //   discription:
    //     'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //   isEnable: true,
    //   },
    //   {
    //   name: 'قیمه',
    //   restaurant: 'حسام اینا',
    //   id: 'd',
    //   price: 5000,
    //   discription:
    //     'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //   isEnable: true,
    //   },
    //   {
    //   name: 'ماهی',
    //   restaurant: 'حسام اینا',
    //   id: 'e',
    //   price: 5000,
    //   discription:
    //     'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //   isEnable: true,
    //   }
    // ];
    this.foods = await this.httpService.get('https://localhost:5001/Customer/GetFoods');
  }

  public async getAllOrders(): Promise<void> {
    // this.orders = [
    //   {
    //     customerName: 'حاج حیدر',
    //     price: 99000,
    //     restaurantName: 'حسام فود',
    //     foods: [
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'aa',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'bb',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'cc',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'dd',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //     ],
    //     situation: 'Pending'
    //   },
    //   {
    //     customerName: 'حاج حیدر',
    //     price: 99000,
    //     restaurantName: 'حسام فود',
    //     foods: [
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'aa',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'bb',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'cc',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         id: 'dd',
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //     ],
    //     situation: 'Pending'
    //   }
    // ];
    await this.getProfile();
    this.orders = this.customerInfo.orders;
  }

  public async orderFoods(foods: OutOrderModel): Promise<void> {
    /* this.foods =  */await this.httpService.post('https://localhost:5001/Customer/Order', foods);
    // console.log("order foods:");
    // console.log(foods);
    await this.getAllOrders();
  }

  public async getProfile(): Promise<void> {
    // this.customerInfo = {
    //   phone: '09393879257',
    //   password: 'aaaaaa',
    //   name: 'محمدرضا',
    //   region: 2,
    //   address: 'زنجان- شهرک اندیشه',
    //   balance: 0,
    //   orders: []
    // }
    this.customerInfo = await this.httpService.get('https://localhost:5001/Customer/Info');
  }

  public async updateProfile(): Promise<void> {
    this.customerInfo = await this.httpService.post('https://localhost:5001/Customer/Edit', this.customerInfo);
  }

  public async search(restaurantName: string, restaurantRegion: number, foodName: string): Promise<void> {
    console.log("restaurant name:", restaurantName);
    console.log("restaurant region:", restaurantRegion);
    console.log("food name:", foodName);
    let url = "https://localhost:5001/Customer/GetFoods";
    let queryArr = [];
    if (restaurantName || restaurantRegion || foodName)
     url= url.concat("?");
    if (restaurantName)
      queryArr.push(`restaurantName=${restaurantName}`);
    if (restaurantRegion)
      queryArr.push(`region=${restaurantRegion}`);
    if (foodName)
      queryArr.push(`foodName=${foodName}`);
    const lastQuery = queryArr.join('&');
    url = url.concat(lastQuery);
    console.log("url:", url);
    this.foods = await this.httpService.get(url);
  }
}
