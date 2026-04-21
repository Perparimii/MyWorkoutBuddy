using Azure.Core;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyWorkoutBuddyApi.Data;
using MyWorkoutBuddyApi.Models.DTOs;
using MyWorkoutBuddyApi.Models.Entities;
using MyWorkoutBuddyApi.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }


    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto request)
    {
        var result = await _authService.RegisterAsync(request);

        if(result == null)
        {
            return BadRequest("Email or username already taken!");
        }

        return Ok(result);
    }
    

    [HttpPost("login")]
    public async Task<ActionResult> LogIn(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);

        if(result == null)
        {
            return Unauthorized("Invalid credentials!");
        }

        return Ok(new{ result });
}
}

