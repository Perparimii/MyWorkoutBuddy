using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using MyWorkoutBuddyApi.Services;

namespace MyWorkoutBuddyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpPost]
        public async Task<ActionResult<Exercise>> CreateExercise(ExerciseDto newExercise)
        {
            var createdExercise = await _exerciseService.CreateExerciseAsync(newExercise);

            return CreatedAtAction(nameof(GetExerciseById), new { id = createdExercise.Id }, newExercise);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseDto>>> GetExercises()
        {
            var exercises = await _exerciseService.GetExercisesAsync();

            if(exercises == null)
            {
                return NotFound("Currently, no exercises exist!");
            }

            return Ok(exercises);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ExerciseDto>> GetExerciseById(int id)
        {
            var exercise = await _exerciseService.GetExerciseByIdAsync(id);

            if(exercise == null)
            {
                return NotFound($"Exercise with Id {id} does not exist!");
            }

            return Ok(exercise);
        }


        [HttpPut]
        public async Task<ActionResult<ExerciseDto>> UpdateExercise(int id, ExerciseDto updatedExercise)
        {
            var exercise = await _exerciseService.UpdateExerciseAsync(id, updatedExercise);

            if(exercise == null)
            {
                return NotFound($"Exercise with Id {id} does not exist!");
            }

            return Ok(exercise);
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteExercise(int id)
        {
            var exercise = await _exerciseService.DeleteExerciseAsync(id);

            if(exercise == false)
            {
                return NotFound($"Exercise with Id {id} does not exist!");
            }

            return NoContent();
        }

    }
}
