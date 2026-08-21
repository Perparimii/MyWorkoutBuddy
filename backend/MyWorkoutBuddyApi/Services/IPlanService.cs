using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using System.Security.Claims;

namespace MyWorkoutBuddyApi.Services
{
    public interface IPlanService
    {
        Task<WorkoutPlan> CreatePlanAsync(CreatePlanDto newPlan);
        Task<IEnumerable<PlanDto?>> GetPlansAsync();
        Task<PlanDto?> GetPlanByIdAsync(int id);
        Task<bool> SelectPlan(ClaimsPrincipal user, int id);
        Task<PlanDto?> UpdatePlanAsync(int id, PlanDto updatedPlan);
        Task<bool> DeletePlanAsync(int id);
    }
}
