using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskWise.Models;
using TaskWise.Repositories.Interfaces;

namespace TaskWise.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpPost]

        public async Task<TasksModel> CreateTask(TasksModel tasksModel)
        {
            return await _taskRepository.CreateTask(tasksModel);
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<TasksModel>> UpdateTask(TasksModel tasksModel, int id)
        {
            tasksModel.Id = id;

            TasksModel tasksModelById = await _taskRepository.UpdateTaskId(tasksModel, id);
            return Ok(tasksModelById);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<TasksModel>> DeleteTask(int id)
        {
            return await _taskRepository.DeleteTaskId(id);
        }

    }
}
