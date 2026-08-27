using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using System.Security.Claims;

namespace MyWorkoutBuddyApi.Services
{
    public class UserService : IUserService
    {
         private readonly WorkoutDbContext _context;

        public UserService(WorkoutDbContext context)
        {
            _context = context;
        }


        public async Task<UserDto?> GetProfile(ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return null;
            }


            var userId = int.Parse(userIdClaim);

            var dbUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (dbUser == null)
            {
                return null;
            }

            return new UserDto
            {
                Id = dbUser.Id,
                UserName = dbUser.UserName,
                Email = dbUser.Email,
                PlanId = dbUser.PlanId,
                Role = dbUser.Role,
                WorkoutPlan = dbUser.WorkoutPlan
            };
        }
    }
}
