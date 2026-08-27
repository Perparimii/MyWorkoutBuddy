using MyWorkoutBuddyApi.Models.DTOs;
using System.Security.Claims;

namespace MyWorkoutBuddyApi.Services
{
    public interface IUserService
    {
        Task<UserDto?> GetProfile(ClaimsPrincipal user);
    }
}
