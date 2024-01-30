using System.Collections.Generic;
using System.Linq;
using SnappFood_BackEnd.Restaurant;

namespace SnappFood_BackEnd.Model
{
    public class OutOrderModel
    {
    public string id { get; set; }
    public string customerName { get; set; }
    public string restaurantName { get; set; }
    public int price { get; set; }
    public List<FoodModel> foods { get; set; }
    public string situation { get; set; }

    public OutOrderModel()
    {}

    public OutOrderModel(Order order)
    {
        id = order.OrderId;
        customerName = order.Customer.Name;
        restaurantName = order.Restaurant.Name;
        price = order.TotalCost;
        situation = order.Situation.ToString();
        foods = new List<FoodModel>();
        order.Foods.ToList().ForEach(food=> foods.Add(new FoodModel(food))); //todo it could be better
    }
    }
}