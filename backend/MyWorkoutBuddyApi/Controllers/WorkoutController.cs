using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using MyWorkoutBuddyApi.Services;

namespace MyWorkoutBuddyApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutController : Controller
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }


        [Authorize(Roles = "Admin")]
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

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutDto>>> GetWorkouts()
        {
            var workouts = await _workoutService.GetWorkoutsAsync(User);

            if (User == null)
            {
                return Unauthorized("User not authenticated!");
            }

            if (workouts == null)
            {
                return NotFound("There are currently no existing workouts or you haven't selected a plan!");
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


        [HttpPost("{workoutId}/exercises/{exerciseId}")]
        public async Task<ActionResult> AddExercisesToWorkout([FromRoute]int workoutId, [FromBody]List<int> exerciseIds)
        {
            var serviceMethod = await _workoutService.AddExercisesToWorkoutAsync(workoutId, exerciseIds);

            if(serviceMethod == false)
            {
                return BadRequest("Something went wrong");
            }

            return NoContent();
        }


        [HttpGet("/todaysworkout")]
        public async Task<ActionResult<TodaysWorkoutDto>> GetTodaysWorkout()
        {   
            var todaysWorkout = await _workoutService.GetTodaysWorkoutAsync(User);

            if(todaysWorkout == null)
            {
                return NotFound("If you have a Plan selected and you are not seeing anything it means today is a rest day!");
            }

            return Ok(todaysWorkout);
        }


        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
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
