using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public interface IWorkoutService
    {
        Task<Workout?> CreateWorkoutAsync(int planId, WorkoutDto newWorkout);
        Task<IEnumerable<WorkoutDto?>> GetWorkoutsAsync();
        Task<WorkoutDto?> GetWorkoutByIdAsync(int id);
        Task<WorkoutDto?> UpdateWorkoutAsync(WorkoutDto updatedWorkout);
        Task<WorkoutDto?> DeleteWorkoutAsync(int id);
    }
}
