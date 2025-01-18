using identity_api.Entities.Dto;
using identity_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace identity_api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class IdentityController(IUserService service) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
        => Ok(await service.Login(model));
    
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto model)
        => Ok(await service.Register(model));
    
    [HttpPost("refresh-token-login")]
    public async Task<IActionResult> RefreshTokenLogin(string refreshToken)
        => Ok(await service.LoginWithRefreshToken(refreshToken));
    
}