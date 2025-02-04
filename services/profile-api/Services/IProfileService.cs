using profile_api.Models;

namespace profile_api.Services;

public interface IProfileService
{
    Task<Profile> GetProfile(Guid id);
    Task Create(Profile profile);
    Task Update(Profile profile);
    Task Delete(Guid id);
}