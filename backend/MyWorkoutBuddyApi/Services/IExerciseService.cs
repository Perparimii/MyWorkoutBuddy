using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public interface IExerciseService
    {
        Task<Exercise> CreateExerciseAsync(ExerciseDto newExercise);
        Task<IEnumerable<ExerciseDto?>> GetExercisesAsync();
        Task<ExerciseDto?> GetExerciseByIdAsync(int id);
        Task<ExerciseDto?> UpdateExerciseAsync(int id, ExerciseDto updatedExercise);
        Task<bool> DeleteExerciseAsync(int id);

    }
}
