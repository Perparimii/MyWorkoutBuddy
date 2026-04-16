using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Data
{
    public class WorkoutDbContext : DbContext
    {
        public WorkoutDbContext(DbContextOptions<WorkoutDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<WorkoutPlan> Plans { get; set; }
        public DbSet<Workout> Workouts { get; set; }

    }
}
