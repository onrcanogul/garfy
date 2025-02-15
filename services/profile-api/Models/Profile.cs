namespace profile_api.Models;

public class Profile
{
    public Guid Id { get; set; }
    public string Username { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string AvatarPath { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Bio { get; set; } = null!;
    public decimal Rating { get; set; }
    public bool IsHidden { get; set; }
    public int PostCount { get; set; }
    public List<Friendship> Following { get; set; } = [];
    public List<Friendship> Followers { get; set; } = [];
}