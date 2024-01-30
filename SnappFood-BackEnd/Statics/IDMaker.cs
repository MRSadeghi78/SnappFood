using System.Collections.Generic;
using System.Security.Cryptography;

namespace SnappFood_BackEnd.Statics
{
    public static class IdMaker
    {
        private static int _managerCounter = 1000;
        private static int _customerCounter = 1000;
        private static int _foodCounter = 1000;
        private static int _restaurantCounter = 1000;
        private static int _commentCounter = 1000;
        private static int _orderCounter = 1000;

        public static string NewManagerId()
        {
            _managerCounter++;
            return "M" + _managerCounter;
        }

        public static string NewCustomerId()
        {
            _customerCounter++;
            return "C" + _customerCounter;
        }

        public static string NewFoodId()
        {
            _foodCounter++;
            return "F" + _foodCounter;
        }

        public static string NewRestaurantId()
        {
            _restaurantCounter++;
            return "R" + _restaurantCounter;
        }

        public static string NewCommentId()
        {
            _commentCounter++;
            return "C" + _commentCounter;
        }
        public static string NewOrderId()
        {
            _orderCounter++;
            return "O" + _orderCounter;
        }
    }
}