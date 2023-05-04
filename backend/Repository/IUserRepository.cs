using backend.Models;

namespace backend.Repository
{
     public interface IUserRepository
    {      

        Task<IEnumerable<User>> GetAllUsers();
        Task AddUser(User user);
        Task<User> FindUser(string username);
        Task UpdateUserAsync(int id, User user);
        Task DeleteUser(User user);
        Task<User> GetUser(string id);
        Task<User> FindUserByRefreshToken(string refreshToken);



    }
}