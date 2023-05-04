using backend.Models;
using backend.Repository;
using backend.Token;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;


namespace backend.Areas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository repository;
        private readonly IConfiguration _configuration;


        public AuthController(IConfiguration configuration, IUserRepository repository)
        {
            _configuration = configuration;
            this.repository = repository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] User user)
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password)) return BadRequest("Username and password are required");
            var foundUser = await repository.FindUser(user.UserName);
            if (foundUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password)) return Unauthorized();

            var accessToken = GenerateAccessToken(foundUser.UserName, foundUser.Role);
            var refreshToken = GenerateRefreshToken(foundUser.UserName);

            foundUser.RefreshToken = refreshToken;
            await repository.UpdateUserAsync(foundUser.Id, foundUser);

            Response.Cookies.Append("jwt", refreshToken, new Microsoft.AspNetCore.Http.CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None,
                MaxAge = TimeSpan.FromDays(1)
            });

            return Ok(new { foundUser.Role, accessToken });
        }

        [HttpGet("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                var cookies = Request.Cookies;
                if (!cookies.ContainsKey("jwt")) return Unauthorized();

                var refreshToken = cookies["jwt"];

                var foundUser = await repository.FindUserByRefreshToken(refreshToken);
                if (foundUser == null) return StatusCode(StatusCodes.Status403Forbidden);

                var newRefreshToken = GenerateRefreshToken(foundUser.UserName);
                foundUser.RefreshToken = newRefreshToken;
                await repository.UpdateUserAsync(foundUser.Id, foundUser);

                var newAccessToken = GenerateAccessToken(foundUser.UserName, foundUser.Role);

                return Ok(new
                {
                    role = foundUser.Role,
                    accessToken = newAccessToken
                });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }            
        }


        private string GenerateAccessToken(string username, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, username),
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddSeconds(int.Parse(_configuration["Jwt:AccessTokenExpireSeconds"])),
            signingCredentials: credentials
           );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken(string username)
        {
            var refreshToken = new RefreshToken()
            {
                Username = username,
                Token = Guid.NewGuid().ToString(),
                ExpirationDate = DateTime.Now.AddDays(int.Parse(_configuration["Jwt:RefreshTokenExpireDays"]))
            };

            return refreshToken.Token;
        }

    }
}