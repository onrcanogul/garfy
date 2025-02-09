using AutoMapper;
using Microsoft.EntityFrameworkCore;
using profile_api.Models;
using profile_api.Models.Enums;
using profile_api.Models.Response;
using profile_api.Repository;

namespace profile_api.Services;

public class FriendshipService(AppDbContext context, IMapper mapper) : IFriendshipService
{
    public async Task<ServiceResponse<List<FriendshipDto>>> Get(Guid userId)
    {
       var friendships = await context.Friendships
           .Where(x => x.ReceiverProfileId == userId && x.RequesterProfileId == userId)
           .ToListAsync();
       var dto = mapper.Map<List<FriendshipDto>>(friendships);
       return ServiceResponse<List<FriendshipDto>>.Success(dto, StatusCodes.Status200OK);
    }

    public async Task<ServiceResponse<List<FriendshipDto>>> GetRequested(Guid userId)
    {
        var friendships = await context.Friendships
            .Where(x => x.RequesterProfileId == userId)
            .ToListAsync();
        var dto = mapper.Map<List<FriendshipDto>>(friendships);
        return ServiceResponse<List<FriendshipDto>>.Success(dto, StatusCodes.Status200OK);
    }

    public async Task<ServiceResponse<List<FriendshipDto>>> GetReceived(Guid userId)
    {
        var friendships = await context.Friendships
            .Where(x => x.ReceiverProfileId == userId)
            .ToListAsync();
        var dto = mapper.Map<List<FriendshipDto>>(friendships);
        return ServiceResponse<List<FriendshipDto>>.Success(dto, StatusCodes.Status200OK);
    }

    public async Task<ServiceResponse<FriendshipDto>> Request(Guid requesterId, Guid receiverId)
    {
        var receiver = await context.Profiles.FirstOrDefaultAsync(x => x.Id == receiverId);
        Friendship friendship = new()
        {
            RequesterProfileId = requesterId,
            ReceiverProfileId = receiverId,
            FriendshipState = receiver.IsHidden ? FriendshipState.Pending : FriendshipState.Accepted
        };
        var entry = await context.Friendships.AddAsync(friendship);
        await context.SaveChangesAsync();
        
        return ServiceResponse<FriendshipDto>.Success(mapper.Map<FriendshipDto>(entry.Entity), StatusCodes.Status201Created);
    }

    public async Task<ServiceResponse<FriendshipDto>> Accept(Guid userId, Guid receiverId)
    {
        var friendship = await context.Friendships.Include(x => x.ReceiverProfile).FirstOrDefaultAsync(x => x.RequesterProfileId == userId && x.ReceiverProfileId == receiverId);
        if (friendship.ReceiverProfile.IsHidden)
        {
            friendship.FriendshipState = FriendshipState.Accepted;
            friendship = context.Friendships.Update(friendship).Entity;
            await context.SaveChangesAsync();
        }
        return ServiceResponse<FriendshipDto>.Success(mapper.Map<FriendshipDto>(friendship), StatusCodes.Status200OK);
    }

    public async Task<ServiceResponse<FriendshipDto>> Reject(Guid userId, Guid receiverId)
    {
        var friendship = await context.Friendships.Include(x => x.ReceiverProfile)
            .FirstOrDefaultAsync(x => x.RequesterProfileId == userId && x.ReceiverProfileId == receiverId);
        if (friendship.ReceiverProfile.IsHidden)
        {
            friendship.FriendshipState = FriendshipState.Accepted;
            friendship = context.Friendships.Update(friendship).Entity;
            await context.SaveChangesAsync();
        }
        return ServiceResponse<FriendshipDto>.Success(mapper.Map<FriendshipDto>(friendship), StatusCodes.Status200OK);
    }

    public async Task<ServiceResponse<NoContent>> Delete(Guid requesterId, Guid receiverId)
    {
        var friendship = context.Friendships.FirstOrDefault(x => x.RequesterProfileId == requesterId && x.ReceiverProfileId == receiverId);
        context.Friendships.Remove(friendship);
        await context.SaveChangesAsync();
        return ServiceResponse<NoContent>.Success(StatusCodes.Status200OK);
    }
}