using System;
using Newtonsoft.Json;

namespace Back_End.Users
{
    public class Session
    {
        [JsonProperty("token")]
        public string Token { get; set; }
        public Session(string token)
        {
            Token = token;
        }

        public bool ExpireCheck()
        {
            //todo
            return true;
        }
    }
}