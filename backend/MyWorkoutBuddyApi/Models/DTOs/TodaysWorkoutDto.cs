namespace MyWorkoutBuddyApi.Models.DTOs
{
    public class TodaysWorkoutDto
    {
        public int Id { get; set; }
        public string WorkoutName { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public List<ExerciseDto> Exercises { get; set; }
    }
}
