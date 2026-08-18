using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using System.Security.Claims;

namespace MyWorkoutBuddyApi.Services
{
    public class PlanService : IPlanService
    {
        private readonly WorkoutDbContext _context;
        public PlanService(WorkoutDbContext context)
        {
            _context = context;
        }


        public async Task<WorkoutPlan> CreatePlanAsync(PlanDto newPlan)
        {
            var plan = new WorkoutPlan
            {
                Name = newPlan.Name,
                Description = newPlan.Description,
                Format = newPlan.Format
            };

            _context.Plans.Add(plan);
            await _context.SaveChangesAsync();
            return plan;
        }


        public async Task<PlanDto?> GetPlanByIdAsync(int id)
        {

            var plan = await _context.Plans.FirstOrDefaultAsync(e => e.Id == id);

            if (plan == null) return null;

            return new PlanDto
            {
                Name = plan.Name,
                Description = plan.Description,
                Format = plan.Format
            };
        }


        public async Task<IEnumerable<PlanDto?>> GetPlansAsync()
        {

            var plans = await _context.Plans
                .Select(p => new PlanDto
                    { 
                         Name = p.Name,
                         Description = p.Description,
                         Format = p.Format
                    })
                .ToListAsync();

            return plans;
        }


        public async Task<bool> AddWorkoutToPlan(int planId, int workoutId)
        {
            var plan = await _context.Plans.FindAsync(planId);

            if (plan == null) return false;

            var workout = await _context.Workouts.FindAsync(workoutId);

            if (workout == null) return false;

            workout.WorkoutPlanId = planId;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<PlanDto?> SelectPlan(ClaimsPrincipal user, int id)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return null;
            }

            var userId = int.Parse(userIdClaim);

            var dbUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            var plan = await _context.Plans.FindAsync(id);

            if (plan == null)
            {
                return null;
            }

            dbUser.PlanId = id;

            await _context.SaveChangesAsync();

            return new PlanDto
            {
                Name = plan.Name,
                Description = plan.Description,
                Format = plan.Format
            };
        }


        public async Task<PlanDto?> UpdatePlanAsync(int id, PlanDto updatedPlan)
        {
            var plan = await _context.Plans.FindAsync(id);
             
            if (plan == null)
            {
                return null;
            }

            plan.Name = updatedPlan.Name;
            plan.Description = updatedPlan.Description;
            plan.Format = updatedPlan.Format;

            await _context.SaveChangesAsync();

            return updatedPlan;
        }

        public async Task<bool> DeletePlanAsync(int id)
        {
            var plan = await _context.Plans.FindAsync(id);

            if (plan == null)
            {
                return false;
            }

            _context.Plans.Remove(plan);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
