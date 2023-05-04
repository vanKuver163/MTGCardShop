using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Areas.Controllers
{
    [ApiController]
    [Area("Admin")]  
    [Route("[area]/[controller]")]  
    public class ProductsController: ControllerBase
    {
        private readonly IProductRepository repository;
        private readonly IWebHostEnvironment hostEnvironment;

        public ProductsController(IProductRepository repository, IWebHostEnvironment environment)
        {
            this.repository = repository;
            this.hostEnvironment = environment;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            var products = await repository.GetProductsAsync();
            return products;
        } 
      

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProductAsync([FromForm]Product product)
        {
            if(product.ImageUpload != null)
            {
                string filePath = "/Images/" + product.Name + ".jpg";
                using (var fileStream = new FileStream(hostEnvironment.WebRootPath + filePath, FileMode.Create))
                {
                    await product.ImageUpload.CopyToAsync(fileStream);
                }            
                product.Image = product.Name + ".jpg";
            }

            product.Slug = product.Name.ToLower().Replace(" ", "-");
            await repository.CreateProductAsync(product);
            return NoContent();
        }

        [HttpPut] 
        public async Task<ActionResult>UpdateProductAsync([FromForm]Product product)
        {  
            if(product.ImageUpload != null)
            {
                string filePath = "/Images/" + product.Name + ".jpg";
                using (var fileStream = new FileStream(hostEnvironment.WebRootPath + filePath, FileMode.Create))
                {
                    await product.ImageUpload.CopyToAsync(fileStream);
                }            
                product.Image = product.Name + ".jpg";
            }

            product.Slug = product.Name.ToLower().Replace(" ", "-");
            await repository.UpdateProductAsync(product);
            return NoContent();
        } 

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult>DeleteProductAsync(int id)
        {           
            await repository.DeleteProductAsync(id);
            return NoContent();
        }
    }
}