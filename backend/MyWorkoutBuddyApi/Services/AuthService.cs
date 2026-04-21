using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyWorkoutBuddyApi.Services
{
    public class AuthService : IAuthService
    {

        private readonly WorkoutDbContext _context;
        public AuthService(WorkoutDbContext context)
        {
            _context = context;
        }
        public async Task<string?> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            { 
                return null; 
            }
                
            var claims = new[]
            {
                 new Claim(ClaimTypes.Name, user.UserName),
                 new Claim(ClaimTypes.Role, user.Role)
             };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("THIS_IS_MY_SECRET_KEY_FOR_WORKOUTS_123"));

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public async Task<User> RegisterAsync(RegisterDto request)
        {

            var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email || u.UserName == request.UserName);

            if (existingUser != null)
            {
                if (existingUser.Email == request.Email)
                {
                    return null;
                }

                if (existingUser.UserName == request.UserName)
                {
                    return null;
                }
            }

            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
