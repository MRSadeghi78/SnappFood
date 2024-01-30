using System.Collections.Generic;
using SnappFood_BackEnd.DataBase;
using SnappFood_BackEnd.Restaurant;

namespace SnappFood_BackEnd.Model
{
    public class FoodModel
    {
        private static IDataBase _dataBase = DataBaseMock.GetInstance();
        
        public string id { get; set; }
        public string name { get; set; }
        public string restaurant{ get; set; }
        public int? price { get; set; }
        public string discription { get; set; }
        public bool? isEnable { get; set; }
        public IEnumerable<CommentModel> commentModels  { get; set; }

        public FoodModel(){}
        
        public FoodModel(Food food)
        {
            name = food.Name;
            price = food.Cost;
            restaurant = _dataBase.ReadRestaurant(food.RestaurantId).Name;
            discription = food.Description;
            isEnable = food.Available;
            id = food.Id;
            var commentModels = new List<CommentModel>();
            food.GetComments().ForEach(comment => commentModels.Add(new CommentModel(comment)));
            this.commentModels = commentModels;
        }
    }
}