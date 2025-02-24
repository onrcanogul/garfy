using Microsoft.AspNetCore.SignalR;
using notification_api.Models.Enums;

namespace notification_api.Hubs;

public class NotificationHub : Hub
{
    public async Task SendNotification(string notificationContent, Priority priority)
    {
        await Clients.All.SendAsync("ReceiveNotification", notificationContent, priority);
    }
    
}