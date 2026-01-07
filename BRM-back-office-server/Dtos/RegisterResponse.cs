namespace BRM_back_office_server.Dtos
{
    public class RegisterResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
    }

}
