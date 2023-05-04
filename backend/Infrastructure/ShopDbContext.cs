using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure
{
    public class ShopDbContext : DbContext
    {
        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options)
        {            
        }       
        public DbSet<Category> Categories { get; set;}
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users {get; set;}
    }
}