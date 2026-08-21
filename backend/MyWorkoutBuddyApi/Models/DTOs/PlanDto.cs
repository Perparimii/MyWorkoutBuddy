using System.ComponentModel.DataAnnotations;

namespace MyWorkoutBuddyApi.Models.DTOs
{
    public class CreatePlanDto
    {
          
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Format { get; set; }
    }
}
