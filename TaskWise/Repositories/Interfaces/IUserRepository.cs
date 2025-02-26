using TaskWise.Models;

namespace TaskWise.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<UserModel> CreateUser(UserModel userModel);
        Task<List<UserModel>> ListAllUsers();
        Task <UserModel> ListUserId(int userId);
        Task<UserModel> UpdateUser(UserModel userModel, int userId);
        Task<UserModel> DeleteUserId(int userId);

    }
}
