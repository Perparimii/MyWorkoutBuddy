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


        [HttpPost]
        public async Task<ActionResult<Workout>> CreateWorkout(WorkoutDto newWorkout)
        {
            var workout = await _workoutService.CreateWorkoutAsync(newWorkout);

            if(workout == null)
            {
                return BadRequest("Please create a valid workout!");
            }

            return Ok(workout);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutDto>>> GetWorkouts()
        {
            var workouts = await _workoutService.GetWorkoutsAsync();

            if(workouts == null)
            {
                return NotFound("There are currently no existing workouts!");
            }

            return Ok(workouts);
        }

    }
}
