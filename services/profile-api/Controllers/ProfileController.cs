using Microsoft.AspNetCore.Mvc;
using profile_api.Models;
using profile_api.Services;

namespace profile_api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ProfileController(IProfileService service): ControllerBase
{
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var data = await service.GetProfile(id);
        return Ok(data);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Profile profile)
    {
        await service.Create(profile);
        return Created();
    }

    [HttpPut]
    public async Task<IActionResult> Update(Profile profile)
    {
        await service.Update(profile);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await service.Delete(id);
        return NoContent();
    }


    [HttpGet("/health")]
    public async Task<IActionResult> Health()
        => Ok(new { status = "Healthy" });
}