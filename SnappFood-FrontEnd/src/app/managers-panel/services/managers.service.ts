import { Injectable } from '@angular/core';
import { Food } from 'src/app/models/food';
import { RestaurantInformation } from '../model/restaurant-information';
import { HttpService } from 'src/app/services/http.service';
import { Order } from 'src/app/models/order';

@Injectable()
export class ManagersSerivce {
  public restaurantInformation: RestaurantInformation;
  public foods: Food[] = [];
  public orders: Order[] = [];

  public constructor(private httpService: HttpService) {
    this.restaurantInformation = new RestaurantInformation();
  }

  public async getProfile(): Promise<void> {
    // this.restaurantInformation.address = "بلوار حاج حیدر - کوچه مرام و معرفت";
    // this.restaurantInformation.coveredRegions = [2, 14, 20];
    // this.restaurantInformation.restaurantName = "حسام فود";
    // this.restaurantInformation.restaurantRegion = 20;
    // this.restaurantInformation.sendFoodPrice = 15000;
    // this.restaurantInformation.sendFoodTime = 30;
    this.restaurantInformation = await this.httpService.get('https://localhost:5001/Manager/RestaurantInfo');
  }

  public async addFood(food: Food): Promise<void> {
    await this.httpService.post('https://localhost:5001/Manager/AddFood', food);
  }

  public async updateProfile(): Promise<void> {
    await this.httpService.post('https://localhost:5001/Manager/EditRestaurant', this.restaurantInformation);
  }

  public async getAllFoods(): Promise<void> {
    // this.foods = [
    //   {
    //   name: 'قرمه سبزی',
    //   price: 5000,
    //   discription:
    //     'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.',
    //   isEnable: false,
    //   }
    // ];
    this.foods = await this.httpService.get('https://localhost:5001/Manager/GetFoods');
  }

  public async deleteFood(food: Food): Promise<void> {
    await this.httpService.post('https://localhost:5001/Manager/DeleteFood', food);
  }

  public async updateFood(food: Food): Promise<void> {
    await this.httpService.put('https://localhost:5001/Manager/ChangeAvailabilityFood', food);
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
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //       {
    //         name: 'قرمه سبزی',
    //         price: 5000,
    //         restaurant: 'حسام فود',
    //         discription:
    //           'آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.',
    //         isEnable: false,
    //       },
    //     ],
    //     situation: 'Pending'
    //   }
    // ];
    this.orders = await this.httpService.get('https://localhost:5001/Manager/GetOrders');
  }

  public async acceptOrder(order: Order): Promise<void> {
    await this.httpService.put('https://localhost:5001/Manager/AcceptOrder', order);
  }

}
