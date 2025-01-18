using identity_api.Entities;

namespace identity_api.Services.Token;

public interface ITokenHandler
{
    Entities.Token CreateToken(User user);
}