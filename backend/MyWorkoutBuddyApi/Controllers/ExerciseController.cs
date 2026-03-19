using Microsoft.AspNetCore.Mvc;

namespace MyWorkoutBuddyApi.Controllers
{
    public class ExerciseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
