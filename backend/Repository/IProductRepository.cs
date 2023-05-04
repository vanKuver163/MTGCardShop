using backend.Models;

namespace backend.Repository
{
    public interface IProductRepository
    {
        Task<Product>GetProductAsync(string slug); 
        Task<IEnumerable<Product>>GetProductsAsync();
        Task CreateProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task<IEnumerable<Product>>GetProductByCategotyAsync(string categorySlug);
        Task DeleteProductAsync(int id);
    }
}