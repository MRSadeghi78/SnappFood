using System.Collections.Generic;
using System.Linq;
using Back_End.Users;
using SnappFood_BackEnd.Statics;

namespace SnappFood_BackEnd.Restaurant
{
    public class Food
    {
        private Dictionary<string, Comment> _comments;

        public string RestaurantId { get; }
        public string Id { get; }
        public string Name { get; }
        public string Description { get; }
        public int Score
        { get=> _sumOfScores / _numOfScores;}
        public int Cost { get; }
        public bool Available { get; set; }
        
        private int _numOfScores = 0;
        private int _sumOfScores = 0;

        public Food(string restaurantId, string name, string description, int cost, bool available)
        {
            _comments = new Dictionary<string, Comment>();
            RestaurantId = restaurantId;
            Id = IdMaker.NewFoodId();
            Name = name;
            Description = description;
            Cost = cost;
            Available = available;
        }

        public Food()
        {
            _comments = new Dictionary<string, Comment>();
        }
        public void AddScore(int score)
        {
            _numOfScores++;
            _sumOfScores += score;
        }
        
        public List<Comment> GetComments()
        {
            return _comments.Values.ToList();
        }
        public bool MakeComment(Customer.Customer customer,string text)
        {
            var comment = new Comment(customer, this, text);
            _comments.Add(comment.CommentId,comment);
            _comments.OrderBy(key => key.Value);
            return true;
        }
        public bool ReplyComment(string commentId ,string text)
        {
            if (_comments[commentId] is not null && _comments[commentId].Reply is null)
            {
                _comments[commentId].Reply = text;
                return true;
            }
            return false;
        }
    }
}