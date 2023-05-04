using backend.Infrastructure;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class SqlUserRepository : IUserRepository
    {
        protected readonly ShopDbContext _db;

        public SqlUserRepository(ShopDbContext db)
        {
            _db = db;
        }

        public async Task AddUser(User user)
        {
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
        }

        public async Task<User> FindUser(string username)
        {
            return await _db.Users.FirstOrDefaultAsync(user => user.UserName == username);
        }

        public async Task UpdateUserAsync(int id, User user)
        {
            _db.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task DeleteUser(User user)
        {
                      
             _db.Users.Remove(user);
            await _db.SaveChangesAsync();
        }

        public async Task<User> GetUser(string id)
        {
            return await _db.Users.FindAsync(id);
        }

        public async Task<User> FindUserByRefreshToken(string refreshToken)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
        }


    }

}