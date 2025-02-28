using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskWise.Models;
using TaskWise.Repositories.Interfaces;

namespace TaskWise.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]

        public async Task<ActionResult<List<UserModel>>> ListAllUsers()
        {
            List<UserModel> userModel = await _userRepository.ListAllUsers();
            return Ok(userModel);
            
        }

        [HttpGet("{userId}")]
        public async Task<UserModel> ListUserId(int userId)
        {
            return await _userRepository.ListUserId(userId);
        }

        [HttpPost]

        public async Task<UserModel> CreateUser(UserModel userModel)
        {
            return await _userRepository.CreateUser(userModel);
        }

        [HttpPut("{userId}")]

        public async Task<ActionResult<UserModel>> UpdateUser(UserModel userModel, int userId)
        {
            userModel.Id = userId;
            UserModel user = await _userRepository.UpdateUser(userModel, userId);
            return user;
        }

        [HttpDelete("{userId}")]

        public async Task<UserModel> DeleteUser (int userId)
        {
            return await _userRepository.DeleteUserId(userId);
        }
    }
}
