using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskWise.Models;

namespace TaskWise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContaController : ControllerBase
    {
        [HttpPost]

        public IActionResult Login([FromBody] LoginModel login)
        {
            if (login.Login == "admin" && login.Password == "admin")
            {
                var token = GerarTokenJWT();
                return Ok(new { token });
            }

            return BadRequest(new { message = "Credenciais inválidas. Por favor, verifique seu nome de usuário e senha." });
        }

        private string GerarTokenJWT()
        {
            string chaveSecreta = "57bb807a-5df7-47d4-b2d4-c3e6d9ea382d";

            var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chaveSecreta));
            var credencial = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("login", "admin"),
                new Claim("nome", "Administrador do Sistema")
            };

            var token = new JwtSecurityToken(
                issuer: "sua_empresa",
                audience: "sua_aplicacao",
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credencial
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }


    }
}
