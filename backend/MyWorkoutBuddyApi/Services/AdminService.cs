using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;

namespace MyWorkoutBuddyApi.Services
{
    public class AdminService : IAdminService
    {
        private readonly WorkoutDbContext _context;

        public AdminService(WorkoutDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var users = await _context.Users.Select(e => new UserDto
            {
                Id = e.Id,
                UserName = e.UserName,
                Email = e.Email,
                Role = e.Role,
                PlanId = e.PlanId
            }).ToListAsync();

            return users;
        }


        public async Task<bool> ChangeUserRole(int id, string role)
        {
            var user = await _context.Users.FindAsync(id);

            if(user == null)
            {
                return false;
            }

            user.Role = role;

            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<bool> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if(user == null)
            {
                return false;
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
