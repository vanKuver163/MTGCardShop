using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Areas.Controllers
{
   
    [ApiController]
    [Area("Admin")]  
    [Route("[area]/[controller]")]  
    public class CategoriesController: ControllerBase
    {
        private readonly ICategoryRepository  repository;
        private readonly IWebHostEnvironment hostEnvironment;

        public CategoriesController(ICategoryRepository repository, IWebHostEnvironment environment)
        {
            this.repository = repository;
            this.hostEnvironment = environment;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            var categories = await repository.GetCategoriesAsync();
            return categories;
        } 

        [HttpGet]
        [Route("{slug}")]
        public async Task<Category> GetCategoryBySlugAsync(string slug)
        {
              var category = await repository.GetCategoryBySlugAsync(slug);
              return category;
        }

        [HttpPost]         
        public async Task<ActionResult<Category>>CreateCategoryAsync([FromForm]Category category)
        {
            if(category.file != null)
            {
                string filePath = "/Images/" + category.Name + ".png";
                using (var fileStream = new FileStream(hostEnvironment.WebRootPath + filePath, FileMode.Create))
                {
                    await category.file.CopyToAsync(fileStream);
                }            
                category.Image = category.Name + ".png";
            }

            category.Slug = category.Name.ToLower().Replace(" ", "-");
            await repository.CreateCategoryAsync(category);
            return NoContent();
        }   

         [HttpPut] 
          public async Task<ActionResult>UpdateCategoryAsync([FromForm]Category category)
        {  
            if(category.file != null)
            {
                string filePath = "/Images/" + category.Name + ".png";
                using (var fileStream = new FileStream(hostEnvironment.WebRootPath + filePath, FileMode.Create))
                {
                    await category.file.CopyToAsync(fileStream);
                }            
                category.Image = category.Name + ".png";
            }

            category.Slug = category.Name.ToLower().Replace(" ", "-");
            await repository.UpdateCategoryAsync(category);
            return NoContent();
        } 


        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult>DeleteCategoryAsync(int id)
        {           
            await repository.DeleteCategoryAsync(id);
            return Ok();
        }

    }

}