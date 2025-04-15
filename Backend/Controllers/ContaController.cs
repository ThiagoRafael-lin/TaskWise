using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.CodeDom.Compiler;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskWise.Data;
using TaskWise.Models;

namespace TaskWise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContaController : ControllerBase
    {
        private readonly TaskWiseDBContext _dbContext;
        private readonly IConfiguration _config;

        public ContaController(TaskWiseDBContext taskWiseDBContext, IConfiguration configuration)
        {
            _dbContext = taskWiseDBContext;
            _config = configuration;
        }


        [HttpPost("Register")]

        public async Task<IActionResult> Register(UserRegisterModel request)
        {
            if (_dbContext.User.Any(u => u.Email == request.Email))
                return BadRequest("email is already in use");
            var user = new UserModel

            {
                Name = request.Name,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            await _dbContext.User.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login (UserLoginModel request)
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized("invalid credentials.");

            var token = GerarTokenJWT(user);
            return Ok(new {token});
           
        }
        private string GerarTokenJWT(UserModel user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }


    }
}
