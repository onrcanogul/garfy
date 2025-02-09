using profile_api.Models.Enums;

namespace profile_api.Models;

public class FriendshipDto
{
    public Guid Id { get; set; }
    public Guid RequesterProfileId { get; set; }
    public Guid ReceiverProfileId { get; set; }
    public ProfileDto? RequesterProfile { get; set; }
    public ProfileDto? ReceiverProfile { get; set; }
    public DateTime CreatedDate { get; set; }
    public FriendshipState FriendshipState { get; set; }
}