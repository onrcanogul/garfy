using Microsoft.EntityFrameworkCore;
using notification_api.Models;

namespace notification_api.Contexts;

public class NotificationDbContext(DbContextOptions<NotificationDbContext> options) : DbContext(options)
{
    public DbSet<Notification> Notifications { get; set; } 
}