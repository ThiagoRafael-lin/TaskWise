using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TaskWise.Data;
using TaskWise.Models;
using TaskWise.Repositories.Interfaces;
using TaskWise.Utils;

namespace TaskWise.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TaskWiseDBContext _dbContext;

        public UserRepository(TaskWiseDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserModel> CreateUser(UserModel userModel)
        {
            try
            {
                userModel.Password = Encryption.GenerateHash(userModel.Password!);

                await _dbContext.AddAsync(userModel);
                _dbContext.SaveChanges();
                return userModel;

            }
            catch (Exception)
            {

                throw new Exception("Could not create your user");
            }
            
        }

        public async Task<UserModel> DeleteUserId(int userId)
        {
            UserModel userById = await ListUserId(userId);

            if (userById == null)
            {
                throw new Exception("Id not found");
            }

            _dbContext.Remove(userById);
            await _dbContext.SaveChangesAsync(); 
            return userById;
            
        }

        public async Task<List<UserModel>> ListAllUsers()
        {
            return await _dbContext.User
                .Include(u => u.Tasks)
                .ToListAsync();
        }

        public async Task<UserModel> ListUserId(int userId)
        {
            return await _dbContext.User.FirstOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<UserModel> UpdateUser(UserModel userModel, int UserId)
        {
            UserModel userById = await ListUserId(UserId);

            if (userById == null)
            {
                throw new Exception("Id not found");
            }

            _dbContext.Update(userById);
            await _dbContext.SaveChangesAsync();
            return userById;

        }
    }
}
