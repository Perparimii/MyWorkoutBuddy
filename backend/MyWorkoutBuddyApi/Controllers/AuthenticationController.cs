using Azure.Core;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly WorkoutDbContext _context;
    public AuthenticationController(WorkoutDbContext context)
    {
        _context = context;
    }


    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto request)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email || u.UserName == request.UserName);

        if (existingUser != null) 
        {
            if (existingUser.Email == request.Email) {
                return BadRequest("This email is already registered!");
            }

            if (existingUser.UserName == request.UserName)
            {
                return BadRequest("Username already taken!");
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

        return Ok(user);
    }
    

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDto dto)
    {
        
        var user = await _context.Users
           .FirstOrDefaultAsync(u => u.UserName == dto.UserName);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
        {
            return Unauthorized("Invalid username or password");
        }

        
        var claims = new[]
         {
            new Claim(ClaimTypes.Name, dto.UserName),
            new Claim(ClaimTypes.Role, "User")
         };

    
    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes("THIS_IS_MY_SECRET_KEY_FOR_WORKOUTS_123"));

    
    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
    );

    return Ok(new
    {
        token = new JwtSecurityTokenHandler().WriteToken(token)
    });
}
}

