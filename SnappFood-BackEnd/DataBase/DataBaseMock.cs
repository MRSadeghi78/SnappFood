using System;
using System.Collections.Generic;
using System.Linq;
using Back_End.Users;
using SnappFood_BackEnd.Statics;
using SnappFood_BackEnd.Restaurant;
namespace SnappFood_BackEnd.DataBase
{
    public class DataBaseMock : IDataBase
    {
        public static IDataBase GetInstance()
        {
            if (firstTime)
            {
                Regions.All.ForEach(region => RegionRestaurants.Add(region, new()));
                firstTime = false;
            }

            return _dataBaseMock;
        }
        private static DataBaseMock _dataBaseMock = new();
        private static bool firstTime = true;
        
        private static readonly Dictionary<string,Manager.Manager> Managers=new(); 
        private static readonly Dictionary<string,Manager.Manager> ManagerSessions=new();
        private static readonly Dictionary<string,Customer.Customer> Customers = new();
        private static readonly Dictionary<string,Customer.Customer> CustomerSessions =new();
        private static readonly Dictionary<string,Food> Foods =new();
        private static readonly Dictionary<string,Restaurant.Restaurant> Restaurants =new();
        private static readonly Dictionary<int,List<Restaurant.Restaurant>> RegionRestaurants =new();

        
        

        public bool CreateManager(Manager.Manager manager)
        {
            Managers.Add(manager.UserName,manager);
            return true;
        }
        public Manager.Manager ReadManager(string id)
        {
            if (!Managers.ContainsKey(id)) return null;
            return Managers[id];
        }
        public bool DeleteManager(string id)
        {
            return Managers.Remove(id);
        }
        
        public bool CreateManagerSession(Manager.Manager manager)
        {
            var session = manager.Session;
            if (session is not null && session.ExpireCheck())
            {
                ManagerSessions.Add(session.Token, manager);
                return true;
            }
            return false;
        }
        public Manager.Manager ReadManagerSession(string token)
        {
            if (ManagerSessions.ContainsKey(token) && token!=ManagerSessions[token].Session.Token)
            {
                //todo for multi sessions
            }
            if (!ManagerSessions.ContainsKey(token)) return null;
            return ManagerSessions[token];
        }
        public bool DeleteManagerSession(string sessionId)
        {
            return ManagerSessions.Remove(sessionId);
        }

        public bool CreateRestaurant(Restaurant.Restaurant restaurant)
        {
            Restaurants.Add(restaurant.Id,restaurant);
            restaurant.CoveredRegions.ForEach(region => RegionRestaurants[region].Add(restaurant));
            return true;
        }
        public Restaurant.Restaurant ReadRestaurant(string id)
        {
            if (!Restaurants.ContainsKey(id)) return null;
            return Restaurants[id];
        } 
        public List<Restaurant.Restaurant> ReadRestaurant(int? region)
        {
            if (region is not null)
                return RegionRestaurants[region.Value];
            return Restaurants.Values.ToList();
        }
        public bool DeleteRestaurant(string id)
        {
            return Restaurants.Remove(id);
        } 
        
        public bool CreateCustomer(Customer.Customer customer)
        {
            Customers.Add(customer.UserName,customer);
            return true;
        }
        public Customer.Customer ReadCustomer(string id)
        {
            if (!Customers.ContainsKey(id)) return null;
            return Customers[id];
        }
        public bool DeleteCustomer(string id)
        {
            return Customers.Remove(id);
        }
        
        public bool CreateCustomerSession(Customer.Customer customer)
        {
            var session = customer.Session;
            if (session is not null && session.ExpireCheck())
            {
                CustomerSessions.Add(session.Token, customer);
                return true;
            }
            return false;
        }
        public Customer.Customer ReadCustomerSession(string token)
        {
            if (CustomerSessions.ContainsKey(token) && token!=CustomerSessions[token].Session.Token)
            {
                //todo for multi sessions
            }
            if (!CustomerSessions.ContainsKey(token)) return null;
            return CustomerSessions[token];
        }
        public bool DeleteCustomerSession(string sessionId)
        {
            return CustomerSessions.Remove(sessionId);
        }

        public Food ReadFood(string foodId)
        {
            Console.WriteLine(foodId+"reed");
            if (!Foods.ContainsKey(foodId)) return null;
            return Foods[foodId];
        }

        public bool DeleteFood(string id)
        {
            if (!Foods.ContainsKey(id))
                return false;
            Foods.Remove(id);
            return true;
        }

        public bool CreateFood(Food food)
        {
            Foods.Add(food.Id,food);
            Console.WriteLine(food.Id+"crt");
            return true;
        }


        public bool UpdateRestaurant(Restaurant.Restaurant restaurant)
        {
            Restaurants[restaurant.Id]=restaurant;
            return true;
        }
        public bool UpdateCustomer(Customer.Customer customer)
        {
            Customers[customer.UserName]=customer;
            return true;
        }
        public bool UpdateManager(Manager.Manager manager)
        {
            Managers[manager.UserName]=manager;
            return true;
        }
    }
}