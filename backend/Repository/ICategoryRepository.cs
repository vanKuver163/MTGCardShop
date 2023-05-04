using backend.Models;

namespace backend.Repository
{
     public interface ICategoryRepository
    {
        Task<Category>GetCategoryAsync(int id);
        Task<Category>GetCategoryBySlugAsync(string slug);      
        Task<IEnumerable<Category>>GetCategoriesAsync();
        Task CreateCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(int id);
    }
}