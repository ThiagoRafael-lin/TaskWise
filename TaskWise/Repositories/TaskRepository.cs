using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TaskWise.Data;
using TaskWise.Models;
using TaskWise.Repositories.Interfaces;

namespace TaskWise.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskWiseDBContext _dbContext;

        public TaskRepository(TaskWiseDBContext dbContext)
        {
           _dbContext = dbContext;
        }

        public async Task<TasksModel> CreateTask(TasksModel taskModel)
        {

            var user = await _dbContext.User.FindAsync(taskModel.UserId);

            if (user == null)
            {
                throw new Exception("user not found");
            }

            taskModel.User = user;

            await _dbContext.AddAsync(taskModel);
            await _dbContext.SaveChangesAsync();
            return taskModel;
        }

        public async Task<TasksModel> DeleteTaskId(int id)
        {
            var taskModelById = await _dbContext.Tasks.FindAsync(id);

            if (taskModelById == null)
            {
                throw new("id not found");
            }

            _dbContext.Remove(id);
            await _dbContext.SaveChangesAsync();
            return taskModelById;
          
        }

        public async Task<TasksModel> UpdateTaskId(TasksModel taskModel, int id)
        {
            var taskModelById = await _dbContext.Tasks.FindAsync(id);

            if (taskModelById == null)
            {
                throw new("id not found");
            }

            taskModelById.Description = taskModel.Description;
            taskModelById.IsCompleted = taskModel.IsCompleted;
            taskModelById.UserId = taskModel.UserId;

            _dbContext.Tasks.Update(taskModelById);
            await _dbContext.SaveChangesAsync();
            return taskModelById;
        }
    }
}
