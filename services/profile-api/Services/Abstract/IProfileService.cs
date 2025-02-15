using profile_api.Models;
using profile_api.Models.Response;
namespace profile_api.Services;

public interface IProfileService
{
    Task<ServiceResponse<ProfileDto>> GetProfile(string username, IFormFileCollection files);
    Task<ServiceResponse<NoContent>> Create(ProfileDto profile);
    Task<ServiceResponse<NoContent>> Update(ProfileDto profile);
    Task<ServiceResponse<NoContent>> Delete(Guid id);
}