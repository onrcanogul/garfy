namespace notification_api.Models;

public class Notification
{
    public Guid Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public string Username { get; set; } = null!;
    public string Content { get; set; } = null!;
    public bool IsRead { get; set; }
}