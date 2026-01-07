namespace BRM_back_office_server.Dtos
{
    public class LoginResponse
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!; 
        public string AccessToken { get; set; } = null!;

    }

}
