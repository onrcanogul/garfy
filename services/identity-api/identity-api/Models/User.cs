using Microsoft.AspNetCore.Identity;

namespace identity_api.Entities;

public class User : IdentityUser<string>
{
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiration { get; set; }
}