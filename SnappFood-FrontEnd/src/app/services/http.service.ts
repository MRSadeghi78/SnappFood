import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantInformation } from '../managers-panel/model/restaurant-information';

@Injectable()
export class HttpService {

    public constructor(public httpClient: HttpClient) {
    }

    public async post(url: string, body: any): Promise<any> {
        const result = await this.httpClient.post(url, body, {
            headers: {
                token: this.getToken()
            }
        }).toPromise();

        return result;
    }

    public async put(url: string, body: any): Promise<any> {
      const result = await this.httpClient.put(url, body, {
          headers: {
              token: this.getToken()
          }
      }).toPromise();

      return result;
  }

    public async get(url: string): Promise<any> {
      const result = await this.httpClient.get(url, {
          headers: {
              token: this.getToken()
          }
      }).toPromise();

      return result;
    }

    private getToken(): string {
        const token = localStorage.getItem('token');
        if (!token) {
            return '';
        }

        return token;
    }

    public getRestaurant(): RestaurantInformation {
      let ri : RestaurantInformation = {
        restaurantName: "حاجی فود",
        restaurantRegion: 2,
        address: "حاجی آباد- کوچه دوم دست راست",
        coveredRegions: [2, 14],
        startWorkTime: null,
        endWorkTime: null,
        sendFoodTime: 10,
        sendFoodPrice: 5,
      };
      return ri;
    }
}
