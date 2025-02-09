using AutoMapper;

namespace profile_api.Services.Mapper;
public class Mapping : Profile
{
    public Mapping()
    {
        CreateMap<Models.Profile, Models.ProfileDto>().ReverseMap();
        CreateMap<Models.Friendship, Models.FriendshipDto>().ReverseMap();
    }
}

