using Newtonsoft.Json;

namespace Back_End.Users
{
    public class User
    {
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }

        public string Salt { get; set; }

        public string Hashed { get; set; }
        
        public Session Session { get; set; }

        public User(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }

        protected User()
        {}
    }
}