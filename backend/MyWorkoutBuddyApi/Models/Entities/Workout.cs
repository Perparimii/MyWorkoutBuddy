namespace MyWorkoutBuddyApi.Models.Entities
{
    public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int ExerciseNumber { get; set; }
        public int WorkoutPlanId { get; set; }
        public WorkoutPlan WorkoutPlan { get; set; }
        public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();

    }
}
