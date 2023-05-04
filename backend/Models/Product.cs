using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        // [Required, MinLength(2, ErrorMessage = "Minimum lenght is 2")]
        public string Name { get; set; }
        public string Slug { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
        // [Display(Name = "Category")]
        // [Range(1, int.MaxValue, ErrorMessage = "You must choose a category")]
        public int CategoryId { get; set; }

        public string Image { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        [NotMappedAttribute]        
        public IFormFile  ImageUpload{ get; set; }
    }
}