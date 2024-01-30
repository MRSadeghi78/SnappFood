using Newtonsoft.Json;

namespace SnappFood_BackEnd.Model
{
    public class ManagerModel
    {
       
        public string email { get; set; }
        public string password  { get; set; }
        public string restaurantName  { get; set; }
        public int restaurantRegion { get; set; }
        public string address { get; set; }
        public int[] coveredRegions { get; set; }
        public string startWorkTime { get; set; }
        public string endWorkTime { get; set; }
        public int sendFoodTime { get; set; }
        public int sendFoodPrice { get; set; }
    }
}