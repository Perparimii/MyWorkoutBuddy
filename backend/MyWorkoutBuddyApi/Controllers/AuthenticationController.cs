using Microsoft.AspNetCore.Mvc;

namespace MyWorkoutBuddyApi.Controllers
{
    public class AuthenticationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
