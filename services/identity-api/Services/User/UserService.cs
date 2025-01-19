using AutoMapper;
using identity_api.Entities;
using identity_api.Entities.Dto;
using identity_api.Exceptions;
using identity_api.Services.Token;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using NoContent = identity_api.Entities.NoContent;

namespace identity_api.Services;

public class UserService(UserManager<User> service, ITokenHandler tokenHandler, IMapper mapper, IHttpContextAccessor httpContextAccessor, IStringLocalizer localizer)
    : IUserService
{
    public string? GetCurrentUsername() => httpContextAccessor.HttpContext?.User.Identity!.Name;
    public async Task<Response<Entities.Token>> Login(LoginDto dto)
    {
        var user = await service.FindByNameAsync(dto.UsernameOrEmail) ?? await service.FindByEmailAsync(dto.UsernameOrEmail)
                   ?? throw new NotFoundException(localizer["UserNotFound"].Value);
        var result = await service.CheckPasswordAsync(user, dto.Password);
        if (!result) throw new Exception();
        var token = tokenHandler.CreateToken(user);
        await UpdateRefreshTokenAsync(token.RefreshToken!, user, token.Expiration, 30);
        return Response<Entities.Token>.Success(token, StatusCodes.Status200OK);
    }
    public async Task<Response<Entities.Token>> LoginWithRefreshToken(string refreshToken)
    {
        var user = await service.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);
        if (user == null) throw new NotFoundException(localizer["UserNotFound"].Value);
        var token = tokenHandler.CreateToken(user);
        await UpdateRefreshTokenAsync(refreshToken, user, token.Expiration, 10);
        return Response<Entities.Token>.Success(token, StatusCodes.Status200OK);
    }
    public async Task<Response<NoContent>> Register(RegisterDto user)
    {
        var result = await service.CreateAsync(new() { Email = user.Email, UserName = user.UserName, Id = Guid.NewGuid().ToString() }, user.Password);
        if (!result.Succeeded) throw new Exception();
        return Response<NoContent>.Success(StatusCodes.Status200OK);
    }
    private async Task UpdateRefreshTokenAsync(string refreshToken, User user, DateTime accessTokenDate, int addToAccessToken)
    {
        if(user == null) throw new NotFoundException(localizer["UserNotFound"].Value);
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiration = accessTokenDate.AddMinutes(addToAccessToken);
        await service.UpdateAsync(user);
    }
}