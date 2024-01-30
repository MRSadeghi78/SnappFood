using System.Collections.Generic;
using System.Linq;
using Back_End.Users;
using Newtonsoft.Json;
using SnappFood_BackEnd.Model;
using SnappFood_BackEnd.Statics;

namespace SnappFood_BackEnd.Restaurant
{
    public class Restaurant
    {
        public Restaurant(string name, string address, int region, List<int> coveredRegions = null,
            int deliveryTimeBias = 10, int deliveryCostBias = 0, string startWorkTime = null, string endWorkTime = null)
        {
            Id = IdMaker.NewRestaurantId();
            Name = name;
            Address = address;
            Region = region;
            CoveredRegions = coveredRegions ?? Regions.All;
            DeliveryTimeBias = deliveryTimeBias;
            DeliveryCostBias = deliveryCostBias;
            StartWorkTime = startWorkTime;
            EndWorkTime = endWorkTime;
        }

        public Restaurant()
        {
            Id = IdMaker.NewRestaurantId();
        }


        private Dictionary<string, Order> _orders = new();
        private Dictionary<string, Food> _foods=new();

        public string Id { get; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int Region { get; set; }
        public List<int> CoveredRegions { get; set; }
        public int DeliveryTimeBias { get; set; }
        public int DeliveryCostBias { get; set; }
        public string StartWorkTime { get; set; }
        public string EndWorkTime { get; set; }


        public List<Food> GetFoods()
        {
            return _foods.Values.ToList();
        }
        public List<Food> GetFoods(List<string>foodIds)
        {
            var foods = new List<Food>();
            foodIds.ForEach(id=>foods.Add(_foods[id]));
            return foods;
        }

        public bool AddFood(Food food)
        {
            _foods.Add(food.Id, food);
            return true;
        }

        public bool DeleteFood(string foodId)
        {
            if (!_foods.ContainsKey(foodId))
                return false;
            return _foods.Remove(foodId);
        }

        public bool ChangeAvailability(string foodId, bool available)
        {
            if (_foods[foodId] is null)
                return false;
            _foods[foodId].Available = !_foods[foodId].Available;
            return true;
        }

        public Dictionary<string, Order> GetOrders()
        {
            return _orders;
        }

        public bool AcceptOrder(string orderId)
        {
            if (_orders[orderId] is not null && _orders[orderId].Situation == Situation.Pending)
            {
                _orders[orderId].Situation = Situation.Preparing;
                return true;
            }

            return false;
        }

        public bool AddOrder(InpOrderModel inpOrderModel, Customer.Customer customer)
        {
            var order=_orders.Values.ToList().Find(
                tempOrder => tempOrder.Customer.UserName == customer.UserName && tempOrder.Situation == Situation.Pending
            );
            if (order is null)
            {
                order = customer.AddOrder(inpOrderModel, this);
                if (order is not null)
                {
                    _orders.Add(order.OrderId, order);
                    return true;
                }
            }
            else
            {
                if(customer.MergeOrder(inpOrderModel, this,order) is not null)
                  return true;
            }

            return false;
        }


        public bool ReplyComment(string foodId, string commentId, string text)
        {
            if (!_foods.ContainsKey(foodId))
                return false;
            return _foods[foodId].ReplyComment(commentId, text);
        }
    }
}