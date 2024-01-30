using System;
using System.Collections.Generic;
using Back_End.Users;
using SnappFood_BackEnd.Statics;

namespace SnappFood_BackEnd.Restaurant
{
    public class Order
    {
        private DateTime? time;
        
        public string OrderId { get; }
        public Customer.Customer Customer { get; }
        public Restaurant Restaurant { get; }
        public List<Food> Foods { get; }
        public int TotalCost { get; set; }
        public Situation Situation { get; set; }

        public Order(Customer.Customer customer, Restaurant restaurant, List<Food> foods, int totalCost)
        {
            OrderId = IdMaker.NewOrderId();
            Customer = customer;
            Restaurant = restaurant;
            Foods = foods;
            TotalCost = totalCost;
            Situation = Situation.Pending;
            time =DateTime.Now;
        }

        public bool MergeOrder(List<Food> foods,int totalCost)
        {
            if (Situation != Situation.Pending)
                return false;
            Foods.AddRange(foods);
            TotalCost += totalCost; 
            return true;
        }

        private sealed class SituationTimeTotalCostRelationalComparer : IComparer<Order>
        {
            public int Compare(Order x, Order y)
            {
                if (ReferenceEquals(x, y)) return 0;
                if (ReferenceEquals(null, y)) return 1;
                if (ReferenceEquals(null, x)) return -1;
                var situationComparison = x.Situation.CompareTo(y.Situation);
                if (situationComparison != 0) return situationComparison;
                var timeComparison = Nullable.Compare(x.time, y.time);
                if (timeComparison != 0) return timeComparison;
                return x.TotalCost.CompareTo(y.TotalCost);
            }
        }

        public static IComparer<Order> SituationTimeTotalCostComparer { get; } = new SituationTimeTotalCostRelationalComparer();
    }
}