
namespace TaskManager_Server.Models.Constants
{
    public static class Role
    {
        public const string Admin = "admin";
        public const string User = "user";
        public const string Manager = "manager";

        public static List<string> GetRoleList()
        {
            List<string> role = new List<string>();
            role.Add(Admin);
            role.Add(User);
            role.Add(Manager);
            return role;
        }     
    }
}
