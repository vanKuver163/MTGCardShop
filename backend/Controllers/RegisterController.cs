using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Areas.Controllers
{
    [ApiController]
    [Route("[controller]")] 
    public class RegisterController: ControllerBase
    {
        private readonly IUserRepository repository;

        public RegisterController(IUserRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost]       
        public async Task<ActionResult> AddUserAsync([FromForm]User user)
        {          
            if(string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password)) return BadRequest("Username and password are required");
            User duplicate = await repository.FindUser(user.UserName);
            if(duplicate!=null) return Conflict();
            user.Role="user";
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await repository.AddUser(user);
            return Created("New user created!", user);
        }
    }
}
