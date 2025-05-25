using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace server_practice.Model
{
    public class User
    {
        [Key]
        public string Email { get; set; } // primery key

        [Required(ErrorMessage = "field required!")]
        [StringLength(20,ErrorMessage = "Name too long")]
        public string Name { get; set; }

        [Required(ErrorMessage = "field required!")]
        public int Age { get; set; }


        [Required(ErrorMessage = "field required!")]
        public string PasswordHash { get; set; } = string.Empty;

        [Required(ErrorMessage = "field required!")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool isGirl { get; set; }
    }
}
