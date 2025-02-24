using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using notification_api.Contexts;
using notification_api.Hubs;
using notification_api.Models;

namespace notification_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NotificationController(NotificationDbContext context, NotificationHub hub) : ControllerBase
{
    [HttpGet("{username}")]
    public async Task<IActionResult> Get([FromRoute] string username)
    {
        var notifications = await context.Notifications
            .Where(n => n.Username == username)
            .OrderByDescending(n => n.CreatedDate).ToListAsync();
        return Ok(notifications);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Notification notification)
    {
        context.Notifications.Add(notification);
        await context.SaveChangesAsync();
        
        await hub.Clients.User(notification.Username).SendAsync("ReceiveNotification", notification.Content);
        
        return CreatedAtAction(nameof(Get), new { Username = notification.Username }, notification);
    }

    [HttpPut]
    public async Task<IActionResult> MarkAsRead(Guid id)
    {
        var notification = await context.Notifications.FindAsync(id);
        if (notification == null) return NotFound();

        notification.IsRead = true;
        await context.SaveChangesAsync();

        return NoContent();
    }
}