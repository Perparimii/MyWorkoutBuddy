using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlansController : Controller
    {
       
        private readonly WorkoutDbContext _context;
        public PlansController(WorkoutDbContext workoutDbContext)
        {
            _context = workoutDbContext;
        }


        [HttpPost]
        public async Task<ActionResult<PlanDto>> CreatePlan(PlanDto newPlan)
        {
            var plan = new WorkoutPlan
            {
                Name = newPlan.Name,
                Description = newPlan.Description,
                Format = newPlan.Format
            };

            _context.Plans.Add(plan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlanById), newPlan);

        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanDto>>> GetPlans()
        {

            var plans = await _context.Plans.ToListAsync();

            if (plans == null || plans.Count == 0)
            {
                return BadRequest("There are currently 0 available plans");
            }

            return Ok(plans);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PlanDto>>> GetPlanById(int id)
        {

            var plan = await _context.Plans.FindAsync(id);

            if (plan == null)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }

            return Ok(plan);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<PlanDto>> UpdatePlan(int id, PlanDto updatedPlan)
        {
            var plan = await _context.Plans.FindAsync(id);

            if (plan == null)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }

            if (!string.IsNullOrWhiteSpace(updatedPlan.Name))
            {
                plan.Name = updatedPlan.Name;
            }

            if (!string.IsNullOrWhiteSpace(updatedPlan.Description))
            {
                plan.Description = updatedPlan.Description;
            }

            if (!string.IsNullOrWhiteSpace(updatedPlan.Format))
            {
                plan.Format = updatedPlan.Format;
            }

            await _context.SaveChangesAsync();

            return Ok();

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<PlanDto>> DeletePlan(int id)
        {
            var plan = await _context.Plans.FindAsync(id);

            if(plan == null)
            {
                return NotFound($"Workout plan with Id {id} doesn't exist");
            }

            _context.Plans.Remove(plan);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }

}

