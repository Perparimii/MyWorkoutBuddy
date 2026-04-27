namespace MyWorkoutBuddyApi.Models.DTOs
{
    public class ExerciseDto
    {
        public string Name { get; set; }
        public int WarmupSets { get; set; }
        public int WorkingSets { get; set; }
        public int MinReps { get; set; }
        public int MaxReps { get; set; }
    }
}
