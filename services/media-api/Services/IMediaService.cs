using media_api.Models.Enums;
using media_api.Models.Response;

namespace media_api.Models.Storage;

public interface IMediaService
{
    Task<ServiceResponse<List<string>>> GetFiles(Guid id, Models.Enums.FileType fileType);

    Task<ServiceResponse<NoContent>> UploadFiles(IFormFileCollection files, string pathOrContainer, FileType fileType,
        Guid id);
}