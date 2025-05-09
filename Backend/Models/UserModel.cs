﻿namespace TaskWise.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public List<TasksModel> Tasks { get; set; } = new();
    }
}
