using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly WorkoutDbContext _context;

        public WorkoutService(WorkoutDbContext context)
        {
            _context = context;
        }


        public async Task<Workout?> CreateWorkoutAsync(WorkoutDto newWorkout)
        {
            var workout = new Workout
            {
                Name = newWorkout.Name,
                DayOfWeek = newWorkout.DayOfWeek,
                ExerciseNumber = newWorkout.ExerciseNumber,
                WorkoutPlanId = newWorkout.PlanId
            };

            if (newWorkout == null) return null;

            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();

            return workout;
        }


        public async Task<IEnumerable<WorkoutDto?>> GetWorkoutsAsync()
        {
            var workouts = await _context.Workouts
                .Select(w => new WorkoutDto
                    {
                        Name = w.Name,
                        DayOfWeek = w.DayOfWeek,
                        ExerciseNumber = w.ExerciseNumber,
                        PlanId = w.WorkoutPlanId

                 }).ToListAsync();

            if (workouts == null || workouts.Count == 0) return null;

            return workouts;
        }


        public async Task AddExercisesToWorkoutAsync(int workoutId, List<int> exerciseIds)
        {
            var workout = await _context.Workouts
                .Include(w => w.Exercises)
                .FirstOrDefaultAsync(w => w.Id == workoutId);

            if (workout == null) return;


            var exercises = await _context.Exercises
                .Where(e => exerciseIds.Contains(e.Id))
                .ToListAsync();

            foreach (var exercise in exercises)
            {
                workout.Exercises.Add(exercise);
            }

            await _context.SaveChangesAsync();
        }

        
        public async Task<WorkoutDto?> GetWorkoutByIdAsync(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);

            if (workout == null) return null;

            return new WorkoutDto
            {
                Name = workout.Name,
                DayOfWeek = workout.DayOfWeek,
                ExerciseNumber = workout.ExerciseNumber,
                PlanId = workout.WorkoutPlanId
            };
        }


        public async Task<WorkoutDto?> UpdateWorkoutAsync(int id, WorkoutDto updatedWorkout)
        {
            var workout = await _context.Workouts.FindAsync(id);
            
            if(workout == null) return null;

            workout.Name = updatedWorkout.Name;
            workout.DayOfWeek = updatedWorkout.DayOfWeek;
            workout.ExerciseNumber = updatedWorkout.ExerciseNumber;
            workout.WorkoutPlanId = updatedWorkout.PlanId;

            await _context.SaveChangesAsync();

            return updatedWorkout;
        }


        public async Task<bool> DeleteWorkoutAsync(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);

            if (workout == null) return false;

            _context.Remove(workout);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
