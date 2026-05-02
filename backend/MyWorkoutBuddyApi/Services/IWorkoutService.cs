using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public interface IWorkoutService
    {
        Task<Workout?> CreateWorkoutAsync(WorkoutDto newWorkout);
        Task AddExercisesToWorkoutAsync(int workoutId, List<int> exerciseIds);
        Task<IEnumerable<WorkoutDto?>> GetWorkoutsAsync();
        Task<WorkoutDto?> GetWorkoutByIdAsync(int id);
        Task<WorkoutDto?> UpdateWorkoutAsync(int id, WorkoutDto updatedWorkout);
        Task<bool> DeleteWorkoutAsync(int id);
    }
}
