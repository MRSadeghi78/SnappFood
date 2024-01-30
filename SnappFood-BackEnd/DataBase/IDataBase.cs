using System.Collections.Generic;
using Back_End.Users;
using SnappFood_BackEnd.Restaurant;

namespace SnappFood_BackEnd.DataBase
{
    public interface IDataBase
    {
        public bool CreateManager(Manager.Manager manager);
        public Manager.Manager ReadManager(string id);
        public bool UpdateManager(Manager.Manager manager);
        public bool DeleteManager(string id);
        public bool CreateManagerSession(Manager.Manager manager);
        public Manager.Manager ReadManagerSession(string token);
        public bool DeleteManagerSession(string sessionId);
        public bool CreateRestaurant(Restaurant.Restaurant restaurant);
        public Restaurant.Restaurant ReadRestaurant(string id);
        public List<Restaurant.Restaurant> ReadRestaurant(int? region);
        public bool UpdateRestaurant(Restaurant.Restaurant restaurant);
        public bool DeleteRestaurant(string id);
        public bool CreateCustomer(Customer.Customer customer);
        public Customer.Customer ReadCustomer(string id);
        public bool UpdateCustomer(Customer.Customer customer);
        public bool DeleteCustomer(string id);
        public Customer.Customer ReadCustomerSession(string token);
        public bool CreateCustomerSession(Customer.Customer customer);
        public bool DeleteCustomerSession(string sessionId);

        public Food ReadFood(string foodId);
        public bool DeleteFood(string id);
        public bool CreateFood(Food food);

    }
}