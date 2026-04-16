namespace MyWorkoutBuddyApi.Models.Entities
{
    public class WorkoutPlan
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Format { get; set; }
        public ICollection<Workout> Workouts { get; set; }
    }
}
