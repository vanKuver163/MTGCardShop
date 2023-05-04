using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Areas.Controllers
{
    
    [ApiController]
    [Route("[controller]")]  
    public class HomeController: ControllerBase
    {
        private readonly ICategoryRepository  repositoryCat;
        private readonly IProductRepository repositoryProd;
        public HomeController(ICategoryRepository repositoryCat, IProductRepository repositoryProd)
        {
            this.repositoryCat = repositoryCat;  
            this.repositoryProd = repositoryProd;
        }

        [HttpGet]
        [Route("categories")]
        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            var categories = await repositoryCat.GetCategoriesAsync();
            return categories;
        } 

        [HttpGet]
        [Route("products")]
        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            var products = await repositoryProd.GetProductsAsync();
            return products;
        } 

        [HttpGet]
        [Route("products/{slug}")]
        public async Task<ActionResult<Product>> GetProductByCategotyAsync(string slug)
        {
              var products = await repositoryProd.GetProductByCategotyAsync(slug); 
              if(products==null) return NotFound();          
              return Ok(products);
        }

        [HttpGet]
        [Route("product/{slug}")]
        public async Task<Product> GetProductAsync(string slug)
        {
            var product = await repositoryProd.GetProductAsync(slug);
            return product;

        }
    }
}