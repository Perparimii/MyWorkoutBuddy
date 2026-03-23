using System.ComponentModel.DataAnnotations;

namespace MyWorkoutBuddyApi.Models.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Username must be at least 3 characters.")]
        [MaxLength(30, ErrorMessage = "Username cannot exceed 30 characters.")]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one number.")]
        public string Password { get; set; } = string.Empty;
    }
}
