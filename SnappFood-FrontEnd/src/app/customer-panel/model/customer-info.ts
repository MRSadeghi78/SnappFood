import { Order } from "../../models/order";

export class CustomerInfo {
  public phone: string;
  public password: string;
  public name: string;
  public region: number;
  public address: string;
  public balance: number;
  public orders: Order[];
}
