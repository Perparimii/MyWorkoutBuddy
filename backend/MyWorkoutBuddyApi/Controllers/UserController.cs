using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Services;

namespace MyWorkoutBuddyApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet]
        public async Task<ActionResult<UserDto>> GetProfile()
        {
            var profile = await _userService.GetProfile(User);

            if(profile == null)
            {
                return Unauthorized("Currently not logged in!");
            }

            return Ok(profile);
        }
    }
}
