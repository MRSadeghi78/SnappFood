using System.Collections.Generic;
using System.Linq;
using Back_End.Users;
using Newtonsoft.Json;
using SnappFood_BackEnd.DataBase;
using SnappFood_BackEnd.Model;
using SnappFood_BackEnd.Restaurant;

namespace SnappFood_BackEnd.Manager
{
    public class Manager : User
    {
        private static IDataBase _dataBase = DataBaseMock.GetInstance();

        [JsonProperty("email")]
        public string Email
        {
            get => base.UserName;
            set => base.UserName = value;
        }

        private Restaurant.Restaurant _restaurant = null;

        public Manager(string userName, string password) : base(userName, password){}

        public bool MakeRestaurant(string name, string address, int region, int[] accessibleRegions = null,
            int deliveryTimeBias = 10, int deliveryCostBias = 0, string startWorkTime = null, string endWorkTime = null)
        {
            if (_restaurant is not null)
                return false;
            List<int> accessibleRegionsList = accessibleRegions?.ToList<int>();
            _restaurant = new Restaurant.Restaurant(name, address, region, accessibleRegionsList, deliveryTimeBias,
                deliveryCostBias, startWorkTime, endWorkTime);
            _dataBase.CreateRestaurant(_restaurant);
            return true;
        }

        public bool EditRestaurant(string name = null, string address = null, int? region = null,
            int[] accessibleRegions = null,
            int? deliveryTimeBias = null, int? deliveryCostBias = 0, string startWorkTime = null,
            string endWorkTime = null)
        {
            if (name is not null)
                _restaurant.Name = name;
            if (address is not null)
                _restaurant.Address = address;
            if (region is not null)
                _restaurant.Region = region.Value;
            if (accessibleRegions is not null)
            {
                List<int> accessibleRegionsList = accessibleRegions?.ToList<int>();
                _restaurant.CoveredRegions = accessibleRegionsList;
            }
            if (deliveryTimeBias is not null)
                _restaurant.DeliveryTimeBias = deliveryTimeBias.Value;
            if (deliveryCostBias is not null)
                _restaurant.DeliveryCostBias = deliveryCostBias.Value;
            if (startWorkTime is not null)
                _restaurant.StartWorkTime = startWorkTime;
            if (endWorkTime is not null)
                _restaurant.EndWorkTime = endWorkTime;
            return true;
        }

        public RestaurantModel GetRestaurant()
        {
            return new RestaurantModel(_restaurant);
        }

        public bool AddFood(string name, string description, int cost, bool available)
        {
            var food = new Food(_restaurant.Id, name, description, cost, available);
            _restaurant.AddFood(food);
            _dataBase.CreateFood(food);
            return true;
        }

        public List<FoodModel> GetFoods()
        {
            var foods = _restaurant.GetFoods();
            var foodModels = new List<FoodModel>();
            foods.ForEach(food => foodModels.Add(new FoodModel(food)));
            return foodModels;
        }

        public bool DeleteFood(string foodId)
        {
            _dataBase.DeleteFood(foodId);
            return _restaurant.DeleteFood(foodId);
        }

        public bool ChangeAvailability(string foodId, bool availability)
        {
            return _restaurant.ChangeAvailability(foodId, availability);
        }

        public List<OutOrderModel> GetOrders()
        {
            var orderModels = new List<OutOrderModel>();
            _restaurant.GetOrders().Values.ToList().ForEach(order => orderModels.Add(new OutOrderModel(order)));
            return orderModels;
        }

        public bool AcceptOrder(string orderId)
        {
            return _restaurant.AcceptOrder(orderId);
        }

        public bool ReplyComment(string foodId, string commentId, string answer)
        {
            return _restaurant.ReplyComment(foodId, commentId, answer);
        }
    }
}