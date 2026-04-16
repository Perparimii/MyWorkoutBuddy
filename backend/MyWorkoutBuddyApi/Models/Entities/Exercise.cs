namespace MyWorkoutBuddyApi.Models.Entities
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int WarmupSets { get; set; }
        public int WorkingSets {  get; set; }
        public int MinReps {  get; set; }
        public int MaxReps { get; set; }
        public ICollection<Workout> Workouts { get; set; } = new List<Workout>();
    }
}
