using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }        
        public string Role { get; set; }
        public string RefreshToken { get; set; }
        public User() { }
    } 
}