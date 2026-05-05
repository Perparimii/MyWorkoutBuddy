using Microsoft.AspNetCore.Mvc;

namespace MyWorkoutBuddyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
