using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly WorkoutDbContext _context;

        public ExerciseService(WorkoutDbContext context)
        {
            _context = context;
        }


        public async Task<Exercise> CreateExerciseAsync(ExerciseDto newExercise)
        {
            var exercise = new Exercise
            {
                Name = newExercise.Name,
                WarmupSets = newExercise.WarmupSets,
                WorkingSets = newExercise.WorkingSets,
                MinReps = newExercise.MinReps,
                MaxReps = newExercise.MaxReps,
            };

            _context.Exercises.Add(exercise);
            await _context.SaveChangesAsync();

            return exercise;
        }


        public async Task<IEnumerable<ExerciseDto?>> GetExercisesAsync()
        {
            var exercises = await _context.Exercises
                .Select(e => new ExerciseDto
                {
                    Name = e.Name,
                    WarmupSets = e.WarmupSets,
                    WorkingSets = e.WorkingSets,
                    MinReps = e.MinReps,
                    MaxReps = e.MaxReps,

                })
                .ToListAsync();

            if (exercises == null) return null;

            return exercises;
        }

        public async Task<ExerciseDto?> GetExerciseByIdAsync(int id)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(e => e.Id == id);

            if (exercise == null) return null;

            return new ExerciseDto
            {
                Name = exercise.Name,
                WarmupSets = exercise.WarmupSets,
                WorkingSets = exercise.WorkingSets,
                MinReps = exercise.MinReps,
                MaxReps = exercise.MaxReps
            };
        }


        public async Task<ExerciseDto?> UpdateExerciseAsync(int id, ExerciseDto updatedExercise)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(e => e.Id == id);

            if (exercise == null) return null;

            exercise.Name = updatedExercise.Name;
            exercise.WarmupSets = updatedExercise.WarmupSets;
            exercise.WorkingSets = updatedExercise.WorkingSets;
            exercise.MinReps = updatedExercise.MinReps;
            exercise.MaxReps = updatedExercise.MaxReps;

             await _context.SaveChangesAsync();

            return updatedExercise;

        }


        public async Task<bool> DeleteExerciseAsync(int id)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(e => e.Id == id);

            if (exercise == null) return false;

            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
