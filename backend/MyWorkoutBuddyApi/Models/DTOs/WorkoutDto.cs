namespace MyWorkoutBuddyApi.Models.DTOs
{
    public class WorkoutDto
    {
        public string Name { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int ExerciseNumber { get; set; }
        public int PlanId {  get; set; }
    }
}
