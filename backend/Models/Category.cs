using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }        
        public string Slug { get; set; }       
        public int Sorting { get; set; }
        public string Image {get; set;}
        [NotMappedAttribute]
        public IFormFile file {get; set;}
    }
}