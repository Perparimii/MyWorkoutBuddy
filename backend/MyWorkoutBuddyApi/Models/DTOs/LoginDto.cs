using System.ComponentModel.DataAnnotations;

namespace MyWorkoutBuddyApi.Models.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
        public string Role {  get; set; } = "User";
    }
}
