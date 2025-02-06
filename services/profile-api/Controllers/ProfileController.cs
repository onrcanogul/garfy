using Microsoft.AspNetCore.Mvc;
using profile_api.Models;
using profile_api.Services;

namespace profile_api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ProfileController(IProfileService service): BaseController
{
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
        => ApiResult(await service.GetProfile(id));

    [HttpPost]
    public async Task<IActionResult> Create(ProfileDto profile)
        => ApiResult(await service.Create(profile));

    [HttpPut]
    public async Task<IActionResult> Update(ProfileDto profile)
        => ApiResult(await service.Update(profile));

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
        => ApiResult(await service.Delete(id));

    [HttpGet("/health")]
    public async Task<IActionResult> Health()
        => Ok(new { status = "Healthy" });
}