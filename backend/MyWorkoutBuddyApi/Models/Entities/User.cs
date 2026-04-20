namespace MyWorkoutBuddyApi.Models.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } = "User";
        public int PlanId { get; set; }
        public WorkoutPlan? WorkoutPlan { get; set; }
    }
}
