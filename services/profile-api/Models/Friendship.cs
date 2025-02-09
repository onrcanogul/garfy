using profile_api.Models.Enums;

namespace profile_api.Models;

public class Friendship
{
    public Guid Id { get; set; }
    public Guid RequesterProfileId { get; set; }
    public Guid ReceiverProfileId { get; set; }
    public DateTime CreatedDate { get; set; }
    
    public Profile? RequesterProfile { get; set; }
    public Profile? ReceiverProfile { get; set; }
    public FriendshipState FriendshipState { get; set; }
}