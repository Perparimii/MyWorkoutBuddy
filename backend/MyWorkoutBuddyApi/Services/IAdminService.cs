using MyWorkoutBuddyApi.Models.DTOs;

namespace MyWorkoutBuddyApi.Services
{
    public interface IAdminService
    {
        Task<IEnumerable<UserDto>> GetUsers();
        Task<bool> ChangeUserRole(int id, String role);
        Task<bool> DeleteUser(int id);
    }
}
