using Microsoft.AspNetCore.Mvc;

namespace MyWorkoutBuddyApi.Controllers
{
    public class PlansController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
