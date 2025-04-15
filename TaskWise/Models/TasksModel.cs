using System.Text.Json.Serialization;

namespace TaskWise.Models
{
    public class TasksModel
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public bool? IsCompleted { get; set; }
        public int UserId { get; set; }

        //[JsonIgnore]
        public UserModel? User { get; set; }
    }
}
