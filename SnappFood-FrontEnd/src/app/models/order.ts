import { Food } from './food';

export class Order {
  public customerName: string;
  public restaurantName: string;
  public price: number;
  public foods: Food[];
  public situation: string;
  public id?: string;
  public restaurantId?: string;
}
