using SnappFood_BackEnd.Restaurant;

namespace SnappFood_BackEnd.Model
{
    public class CommentModel
    {
        public string text;
        public string reply;

        // public double Score;
        public CommentModel(){}
        public CommentModel(Comment comment)
        {
            text = comment.Text;
            reply = comment.Reply;
        }
    }
}