using System;
using System.Collections.Generic;
using Back_End.Users;
using SnappFood_BackEnd.Statics;

namespace SnappFood_BackEnd.Restaurant
{
    public class Comment
    {
        private DateTime? time;
        
        public Customer.Customer Customer { get; }
        public Food Food { get; }
        public string CommentId { get; }
        public string Text { get; set; }
        public string Reply { get; set; }
        //todo score?

        public Comment(Customer.Customer customer,Food food, string text)
        {
            Customer = customer;
            Food = food;
            Text = text;
            Reply = null;
            CommentId = IdMaker.NewCommentId();

        }

        private sealed class TimeRelationalComparer : IComparer<Comment>
        {
            public int Compare(Comment x, Comment y)
            {
                if (ReferenceEquals(x, y)) return 0;
                if (ReferenceEquals(null, y)) return 1;
                if (ReferenceEquals(null, x)) return -1;
                return Nullable.Compare(x.time, y.time);
            }
        }
        public static IComparer<Comment> TimeComparer { get; } = new TimeRelationalComparer();
    }
}