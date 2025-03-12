using TaskWise.Models;

namespace TaskWise.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<TasksModel> CreateTask(TasksModel taskModel);
        Task<TasksModel> UpdateTaskId(TasksModel taskModel, int id);

        Task<TasksModel> DeleteTaskId(int id);
    }
}
