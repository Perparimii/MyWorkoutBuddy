using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;

namespace MyWorkoutBuddyApi.Services
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(RegisterDto registerDto);
        Task<LoginDto> LoginAsync(LoginDto loginDto);
    }
}
