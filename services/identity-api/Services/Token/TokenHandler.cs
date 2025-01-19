using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using identity_api.Entities;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace identity_api.Services.Token;

public class TokenHandler(IConfiguration configuration) : ITokenHandler
{
    public Entities.Token CreateToken(User user)
    {
        Entities.Token token = new();
        SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(configuration["Token:SecurityKey"]!));
        SigningCredentials signingCredentials = new(securityKey,SecurityAlgorithms.HmacSha256);
        token.Expiration = DateTime.UtcNow.AddMinutes(15);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new("name", user.UserName!),
            new("id", user.Id.ToString())
        };
        JwtSecurityToken jwtSecurityToken = new(
            issuer: configuration["Token:Issuer"],
            audience: configuration["Token:Audience"],
            notBefore: DateTime.UtcNow,
            expires: token.Expiration,
            signingCredentials: signingCredentials,
            claims: claims
        );
        JwtSecurityTokenHandler handler = new();
        token.AccessToken = handler.WriteToken(jwtSecurityToken);
        token.RefreshToken = CreateRefreshToken();
        return token;
    }
    private static string CreateRefreshToken()
    {
        var number = new byte[32];
        using var random = RandomNumberGenerator.Create();
        random.GetBytes(number);
        return Convert.ToBase64String(number);
    }
}