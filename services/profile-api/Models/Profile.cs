namespace profile_api.Models;

public class Profile
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string FullName { get; set; }
    public string AvatarPath { get; set; }
    public string Email { get; set; }
    public string Bio { get; set; }
    public decimal Rating { get; set; }
    public bool IsHidden { get; set; }
    public int PostCount { get; set; }
    public List<Friendship> Following { get; set; } = [];
    public List<Friendship> Followers { get; set; } = [];
}