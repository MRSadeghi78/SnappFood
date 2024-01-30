using System.Collections.Generic;

namespace SnappFood_BackEnd.Model
{
    public class CustomerModel
    {
        public string phone { get; set; }
        public string password  { get; set; }
        public string name  { get; set; }
        public int region { get; set; }
        public string address { get; set; }
        public int balance { get; set; }
        public List<OutOrderModel>orders { get; set; }

        public CustomerModel() {}
        public CustomerModel(Customer.Customer customer)
        {
            phone = customer.Phone;
            name = customer.Name;
            region = customer.Region;
            address = customer.Address;
            balance = customer.Balance;
            orders = customer.GetOrders();
        }
        
    }
}