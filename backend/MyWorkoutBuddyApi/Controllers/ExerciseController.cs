using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Services;

namespace MyWorkoutBuddyApi.Controllers
{
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            this.exerciseService = exerciseService;
        }

        [HttpPost]
        [HttpGet]
        [HttpGet("${id}")]
        [HttpPut]
        [HttpDelete]
    }
}
