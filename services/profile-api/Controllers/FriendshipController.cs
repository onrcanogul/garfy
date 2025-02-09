using Microsoft.AspNetCore.Mvc;
using profile_api.Services;

namespace profile_api.Controllers;

public class FriendshipController(IFriendshipService service) : BaseController
{
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> Get(Guid userId)
        => ApiResult(await service.Get(userId));
    [HttpGet("requested/{userId:guid}")]
    public async Task<IActionResult> GetRequested(Guid userId)
        => ApiResult(await service.GetRequested(userId));
    [HttpGet("received/{userId:guid}")]
    public async Task<IActionResult> GetReceived(Guid userId)
        => ApiResult(await service.GetReceived(userId));
    [HttpPost("reject")]
    public async Task<IActionResult> Reject(Guid requesterId, Guid receiverId)
        => ApiResult(await service.Reject(requesterId, receiverId));
    [HttpPost("accept")]
    public async Task<IActionResult> Accept(Guid requesterId, Guid receiverId)
        => ApiResult(await service.Accept(requesterId, receiverId));
    [HttpPost]
    public async Task<IActionResult> Request(Guid requesterId, Guid receiverId)
        => ApiResult(await service.Request(requesterId, receiverId));
    [HttpDelete]
    public async Task<IActionResult> Delete(Guid requesterId, Guid receiverId)
        => ApiResult(await service.Delete(requesterId, receiverId));
    
}