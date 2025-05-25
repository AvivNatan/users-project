using System.Net.Cache;

namespace server_practice.DTO
{
    public class registerDto
    {
        public string name { get; set; }
        public int age { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public bool isGirl { get; set; }
        
    }
}
