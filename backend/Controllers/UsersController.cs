using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Repository;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]  
    public class UsersController: ControllerBase
   {
        private readonly IUserRepository repository;

        public UsersController( IUserRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await repository.GetAllUsers();
            if (!users.Any()) return NoContent();
            return Ok(users);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest("User ID required");
            var user = await repository.GetUser(id);
            if (user == null) return NoContent();
            await repository.DeleteUser(user);
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest("User ID required");
            var user = await repository.GetUser(id);
            if (user == null) return NoContent();
            return Ok(user);
        }
        
   }

}