using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public class WorkoutService : IWorkoutService
    {
        public Task<Workout?> CreateWorkoutAsync(int planId, WorkoutDto newWorkout)
        {
            throw new NotImplementedException();
        }

        public Task<WorkoutDto?> DeleteWorkoutAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<WorkoutDto?> GetWorkoutByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<WorkoutDto?>> GetWorkoutsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<WorkoutDto?> UpdateWorkoutAsync(WorkoutDto updatedWorkout)
        {
            throw new NotImplementedException();
        }
    }
}
