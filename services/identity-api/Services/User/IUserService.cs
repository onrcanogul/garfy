using identity_api.Entities;
using identity_api.Entities.Dto;
using NoContent = Microsoft.AspNetCore.Http.HttpResults.NoContent;

namespace identity_api.Services;

public interface IUserService
{
    Task<Response<Entities.Token>> Login(LoginDto dto);
    Task<Response<Entities.Token>> LoginWithRefreshToken(string refreshToken);
    Task<Response<Entities.NoContent>> Register(RegisterDto user);
}