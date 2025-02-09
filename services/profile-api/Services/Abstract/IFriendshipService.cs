using profile_api.Models;
using profile_api.Models.Response;

namespace profile_api.Services;

public interface IFriendshipService
{
    Task<ServiceResponse<List<FriendshipDto>>> Get(Guid userId);
    Task<ServiceResponse<List<FriendshipDto>>> GetRequested(Guid userId);
    Task<ServiceResponse<List<FriendshipDto>>> GetReceived(Guid userId);
    Task<ServiceResponse<FriendshipDto>> Request(Guid requesterId, Guid receiverId);
    Task<ServiceResponse<FriendshipDto>> Accept(Guid userId, Guid receiverId);
    Task<ServiceResponse<FriendshipDto>> Reject(Guid userId, Guid receiverId);
    Task<ServiceResponse<NoContent>> Delete(Guid requesterId, Guid receiverId);
}