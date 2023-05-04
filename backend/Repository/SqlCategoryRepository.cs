using backend.Infrastructure;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Repository
{
    public class SqlCategoryRepository : ICategoryRepository
    {
        protected readonly ShopDbContext _db;

         public SqlCategoryRepository(ShopDbContext db)
        {
            _db = db;
        }

        public async Task CreateCategoryAsync(Category category)
        {
            await _db.Categories.AddAsync(category);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
             var categoryDelete = await _db.Categories.FindAsync(id);
            _db.Categories.Remove(categoryDelete);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            IQueryable<Category> categories = from c in _db.Categories orderby c.Sorting select c; 
            return await categories.ToListAsync();
        }

        public async Task<Category> GetCategoryAsync(int id)
        {
            return await _db.Categories.FirstOrDefaultAsync(category => category.Id == id);
        }

      

        public async Task UpdateCategoryAsync(Category category)
        {
            _db.Categories.Update(category);            
            await _db.SaveChangesAsync();
        }

        public async Task<Category> GetCategoryBySlugAsync(string slug)
        {
            return await _db.Categories.FirstOrDefaultAsync(category => category.Slug == slug);
        }
    }
}