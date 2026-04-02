using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using MyWorkoutBuddyApi.Services;
using System.Numerics;

namespace MyWorkoutBuddyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlansController : Controller
    {
       
        private readonly IPlanService _planService;
        public PlansController(IPlanService planService)
        {
            _planService = planService;
        }


        [HttpPost]
        public async Task<ActionResult<WorkoutPlan>> CreatePlan(PlanDto newPlan)
        {

            var createdPlan = await _planService.CreatePlanAsync(newPlan);

            return CreatedAtAction(nameof(GetPlanById), new { id = createdPlan.Id }, newPlan);

        }


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


        [HttpPut("{id}")]
        public async Task<ActionResult<PlanDto>> UpdatePlan(int id, PlanDto updatedPlan)
        {
            var plan = await _planService.UpdatePlanAsync( id, updatedPlan);

            if (plan == null)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }

            return Ok();

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<PlanDto>> DeletePlan(int id, PlanDto deltedPlan)
        {
            var plan = await _planService.DeletePlanAsync(id, deltedPlan);

            if(plan == null)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }


            return Ok();
        }
    }

}

