using System.Collections.Generic;
using System.Linq;
using Back_End.Users;
using SnappFood_BackEnd.Model;
using SnappFood_BackEnd.Restaurant;

namespace SnappFood_BackEnd.Customer
{
    public class Customer : User
    {
        private static int InitialBalance = 1000000;

        public string Phone
        {
            get => UserName;
            set => UserName = value;
        }

        public string Name { get; set; }
        public int Region { get; set; }
        public string Address { get; set; }
        public int Balance { get; set; }

        private Dictionary<string, Order> _orders = new();

        public Customer(string userName, string password) : base(userName, password)
        {
        }

        public Customer(string phone, string password, string name, string address, int region, int? balance = null)
        {
            Phone = phone;
            Name = name;
            Password = password;
            Address = address;
            Region = region;
            Balance = balance ?? InitialBalance;
        }

        public bool EditCustomer(string name, string address, int? region)
        {
            Name = name ?? Name;
            Address = address ?? Address;
            Region = region ?? Region;
            return true;
        }

        public List<OutOrderModel> GetOrders()
        {
            var orderModels = new List<OutOrderModel>();
            _orders.Values.ToList().ForEach(order => orderModels.Add(new OutOrderModel(order)));
            return orderModels;
        }

        public CustomerModel GetInfo()
        {
            return new CustomerModel(this);
        }

        public Order AddOrder(InpOrderModel inpOrderModel, Restaurant.Restaurant restaurant)
        {
            var sum = restaurant.DeliveryCostBias;
            var foods = restaurant.GetFoods(inpOrderModel.foodIds);
            foods.ForEach(food => sum += food.Cost);
            if (sum > Balance)
                return null;
            
            var order = new Order(this, restaurant, foods, sum);
            Balance -= sum;
            _orders.Add(order.OrderId, order);
            return order;
        }
        public Order MergeOrder(InpOrderModel inpOrderModel, Restaurant.Restaurant restaurant,Order order)
        {
            var sum = restaurant.DeliveryCostBias;
            var foods = restaurant.GetFoods(inpOrderModel.foodIds);
            foods.ForEach(food => sum += food.Cost);
            if (sum > Balance)
                return null;
            
            order.MergeOrder(foods,sum);
            Balance -= sum;
            return order;
        }
    }
}