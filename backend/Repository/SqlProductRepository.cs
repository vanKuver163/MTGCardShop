using backend.Infrastructure;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class SqlProductRepository : IProductRepository
    {
        protected readonly ShopDbContext _db;

        public SqlProductRepository(ShopDbContext db)
        {
            _db = db;
        }

        public async Task CreateProductAsync(Product product)
        {
            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            var productDelete = await _db.Products.FindAsync(id);
            _db.Products.Remove(productDelete);
            await _db.SaveChangesAsync();
        }

        public async Task<Product> GetProductAsync(string slug)
        {
           return await _db.Products.FirstOrDefaultAsync(product => product.Slug == slug);
        }   

        public async Task<IEnumerable<Product>> GetProductByCategotyAsync(string categorySlug) 
        {
             Category category = await _db.Categories.Where(x => x.Slug == categorySlug).FirstOrDefaultAsync();            
             return await _db.Products.OrderByDescending(x => x.Id).Where(x=>x.CategoryId == category.Id).ToListAsync();             
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {            
            return await _db.Products.OrderByDescending(p=>p.Id).Include(p=>p.Category).ToListAsync();
        }      

        public async Task UpdateProductAsync(Product product)
        {
             _db.Products.Update(product);            
            await _db.SaveChangesAsync();
        }
    }
}