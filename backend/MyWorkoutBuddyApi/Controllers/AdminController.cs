using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Services;
using System.Runtime.CompilerServices;

namespace MyWorkoutBuddyApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _adminService.GetUsers();

            if(users == null)
            {
                return BadRequest("No users available!");
            }

            return Ok(users);
        }


        [HttpPatch]
        public async Task<ActionResult> ChangeUserRole(int id, string role)
        {
            var user = await _adminService.ChangeUserRole(id, role);

            if(user == false)
            {
                return NotFound($"User with Id {id} could not be found");
            }

            return NoContent();
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var deletedUser = await _adminService.DeleteUser(id);

            if (deletedUser == false)
            {
                return NotFound($"User with Id {id} could not be found");
            }

            return NoContent();
        }
        

    }
}
