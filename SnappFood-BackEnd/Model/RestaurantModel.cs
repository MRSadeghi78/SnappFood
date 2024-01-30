using Newtonsoft.Json;

namespace SnappFood_BackEnd.Model
{
    public class RestaurantModel
    {
        [JsonProperty("restaurantName")] 
        public string restaurantName { get; set; }
        public int restaurantRegion { get; set; }
        public string address { get; set; }
        public int[] coveredRegions { get; set; }
        public string startWorkTime { get; set; }
        public string endWorkTime { get; set; }
        public int sendFoodTime { get; set; }
        public int sendFoodPrice { get; set; }

        public RestaurantModel(){}
        public RestaurantModel(Restaurant.Restaurant restaurant)
        {
            restaurantName = restaurant.Name;
            restaurantRegion = restaurant.Region;
            address = restaurant.Address;
            coveredRegions = restaurant.CoveredRegions?.ToArray();
            startWorkTime = restaurant.StartWorkTime;
            endWorkTime = restaurant.EndWorkTime;
            sendFoodTime = restaurant.DeliveryTimeBias;
            sendFoodPrice = restaurant.DeliveryCostBias;
        }
    }
}