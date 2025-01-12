using System.ComponentModel.DataAnnotations;

namespace Cars.API.Login
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,8}$", ErrorMessage = "Haslo musi miec jedna mala litere, jedna duza litere, jedna cyfre. Musi miec dlugosc miedzy 6 a 8")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string DisplayName { get; set; }
    }
}
