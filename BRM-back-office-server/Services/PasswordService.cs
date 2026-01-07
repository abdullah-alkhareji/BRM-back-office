using BRM_back_office_server.Models;
using Microsoft.AspNetCore.Identity;

namespace BRM_back_office_server.Services
{
    public class PasswordService
    {
        private readonly PasswordHasher<User> _hasher = new();

        public string Hash(string password)
        {
            var user = new User();
            return _hasher.HashPassword(user, password);
        }

        public bool Verify(string hashedPassword, string providedPassword)
        {
            var user = new User();

            var result = _hasher.VerifyHashedPassword(
                user,
                hashedPassword,
                providedPassword);

            return result == PasswordVerificationResult.Success;
        }
    }
}
