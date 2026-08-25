using MyWorkoutBuddyApi.Models.DTOs;
using System.Security.Claims;

namespace MyWorkoutBuddyApi.Services
{
    public interface IUserservice
    {
        Task<UserDto?> GetProfile(ClaimsPrincipal user);
    }
}
