using System.ComponentModel.DataAnnotations;

namespace BRM_back_office_server.Dtos
{

    public class CreateCustomerRequest
    {
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
