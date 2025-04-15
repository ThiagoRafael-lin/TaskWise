using Microsoft.EntityFrameworkCore;
using TaskWise.Models;

namespace TaskWise.Data
{
    public class TaskWiseDBContext : DbContext
    {
        public TaskWiseDBContext(DbContextOptions<TaskWiseDBContext> options)
            : base(options) { }

        public DbSet<UserModel> User { get; set; }
        public DbSet<TasksModel> Tasks { get; set; }


    }
}
