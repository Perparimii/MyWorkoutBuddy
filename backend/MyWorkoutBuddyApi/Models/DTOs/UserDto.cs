using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Models.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } = "User";
        public int PlanId { get; set; }
    }
}
