using BRM_back_office_server.Data;
using BRM_back_office_server.Dtos;
using BRM_back_office_server.Models;
using BRM_back_office_server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BRM_back_office_server.Controllers
{

    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly PasswordService _passwordService;

        public AuthController(
            AppDbContext db,
            PasswordService passwordService)
        {
            _db = db;
            _passwordService = passwordService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var email = request.Email.Trim().ToLower();

            bool exists = await _db.Users
                .AnyAsync(x => x.Email == email);

            if (exists)
                return BadRequest("Email already registered");

            var passwordHash =
                _passwordService.Hash(request.Password);

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                PasswordHash = passwordHash
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new RegisterResponse
            {
                Id = user.Id,
                Email = user.Email
            });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginRequest request,
            [FromServices] JwtService jwtService
        )
        {
            var email = request.Email.Trim().ToLower();

            var user = await _db.Users
                .SingleOrDefaultAsync(x => x.Email == email);

            if (user == null || !user.IsActive)
                return Unauthorized("Invalid email or password");

            bool valid = _passwordService.Verify(
                user.PasswordHash,
                request.Password);

            if (!valid)
                return Unauthorized("Invalid email or password");

            var token = jwtService.CreateToken(user);

            return Ok(new LoginResponse
            {
                Id = user.Id,
                Email = user.Email,
                AccessToken = token
            });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier)
            });
        }
    }
}
