using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public interface IPlanService
    {
        Task<WorkoutPlan> CreatePlanAsync(PlanDto newPlan);
        Task<IEnumerable<PlanDto>> GetPlansAsync();
        Task<IEnumerable<PlanDto>> GetPlanByIdAsync(int id);
        Task<PlanDto> UpdatePlanAsync(int id, PlanDto updatedPlan);
        Task<PlanDto> DeletePlanAsync(int id, PlanDto deletedPlan);
    }
}
