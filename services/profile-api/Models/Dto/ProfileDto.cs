namespace profile_api.Models;
public class ProfileDto
{
    public Guid Id { get; set; }
    public string Username { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string? AvatarPath { get; set; }
    public string Email { get; set; } = null!;
    public string? Bio { get; set; }
    public decimal Rating { get; set; }
}

