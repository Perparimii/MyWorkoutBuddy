using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using MyWorkoutBuddyApi.Services;

namespace MyWorkoutBuddyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        //doesnt associate a Plan correspondent to the PlanId
        [HttpPost]
        public async Task<ActionResult<Workout>> CreateWorkout(WorkoutDto newWorkout)
        {
            var workout = await _workoutService.CreateWorkoutAsync(newWorkout);

            if (workout == null)
            {
                return BadRequest("Please create a valid workout!");
            }

            return CreatedAtAction(nameof(GetWorkoutByID), new { id = workout.Id }, newWorkout);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutDto>>> GetWorkouts()
        {
            var workouts = await _workoutService.GetWorkoutsAsync();

            if (workouts == null)
            {
                return NotFound("There are currently no existing workouts!");
            }

            return Ok(workouts);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutDto>> GetWorkoutByID(int id)
        {
            var workout = await _workoutService.GetWorkoutByIdAsync(id);

            if(workout == null)
            {
                return NotFound($"Workout with Id {id} does not exist");
            }

            return Ok(workout);
        }


        [HttpPut]
        public async Task<ActionResult<WorkoutDto>> UpdateWorkout(int id, WorkoutDto updatedWorkout)
        {
            var oldWorkout = await _workoutService.UpdateWorkoutAsync(id, updatedWorkout);

            if(oldWorkout == null)
            {
                return NotFound($"Workout with Id {id} does not exist");
            }

            return Ok(oldWorkout);
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteWorkout(int id)
        {
            var workout = await _workoutService.DeleteWorkoutAsync(id);

            if(workout == false)
            {
                return NotFound($"Workout with Id {id} does not exist");
            }

            return NoContent();
        }
    }
}
