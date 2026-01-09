using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BRM_back_office_server.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CustomerNumber { get; set; } // Int (9 digits)

        [Required]
        [MaxLength(255)]
        public string CustomerName { get; set; } = null!;

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [MaxLength(1)]
        public string Gender { get; set; } = null!;
    }
}
