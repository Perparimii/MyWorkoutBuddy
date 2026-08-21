using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using MyWorkoutBuddyApi.Services;
using System.Numerics;
using System.Security.Claims;

namespace MyWorkoutBuddyApi.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PlansController : ControllerBase
    {

        private readonly IPlanService _planService;
        private readonly IAuthService _authService;
        public PlansController(IPlanService planService, IAuthService authService)
        {
            _planService = planService;
            _authService = authService;
        }

        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<ActionResult<WorkoutPlan>> CreatePlan(CreatePlanDto newPlan)
        {

            var createdPlan = await _planService.CreatePlanAsync(newPlan);

            return CreatedAtAction(nameof(GetPlanById), new { id = createdPlan.Id }, newPlan);

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanDto>>> GetPlans()
        {

            var plans = await _planService.GetPlansAsync();

            if (plans == null)
            {
                return BadRequest("There are currently 0 available plans");
            }

            return Ok(plans);

        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PlanDto>>> GetPlanById(int id)
        {

            var plan = await _planService.GetPlanByIdAsync(id);

            if (plan == null)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }

            return Ok(plan);
        }


        [HttpPatch("{id}")]
        public async Task<ActionResult> SelectPlan(int id)
        {
            var userPlan = await _planService.SelectPlan(User, id);

            if(userPlan == false)
            {
                return BadRequest($"Plan with id {id} doesn't exist!");
            }

            return NoContent();
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<PlanDto>> UpdatePlan(int id, PlanDto updatedPlan)
        {
            var plan = await _planService.UpdatePlanAsync(id, updatedPlan);

            if (plan == null)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }

            return Ok();

        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlan(int id)
        {
            var plan = await _planService.DeletePlanAsync(id);

            if(plan == false)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }

            return NoContent();
        }
    }

}

