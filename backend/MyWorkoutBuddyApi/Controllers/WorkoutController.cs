using Microsoft.AspNetCore.Mvc;

namespace MyWorkoutBuddyApi.Controllers
{
    public class WorkoutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
