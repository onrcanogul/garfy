using media_api.Infrastructure;
using media_api.Models.Enums;
using media_api.Models.Response;
using media_api.Models.Storage;
using FileType = media_api.Models.Enums.FileType;

namespace media_api.Services;

public class MediaService(MediaDbContext context, IStorageService storageService) : IMediaService
{
    public async Task<ServiceResponse<List<string>>> GetFiles(Guid id, FileType fileType)
    {
        Console.WriteLine("Pingaldo");
        var containerName = fileType switch
        {
            FileType.PostImage => "post-images",
            FileType.ProfileImage => "profile-images",
            FileType.ReelsVideo => "reels-videos",
            FileType.QuestionImage => "question-images",
            FileType.Unknown => "unknown-files",
            _ => throw new ArgumentOutOfRangeException(nameof(fileType), fileType, null)
        };
        var files = storageService.GetFiles(containerName, id);
        Console.WriteLine("FilesCount: ");
        Console.WriteLine(files.Count);
        Console.WriteLine("PingaldoEnd");
        return ServiceResponse<List<string>>.Success(files, StatusCodes.Status200OK);
    }
    public async Task<ServiceResponse<NoContent>> UploadFiles(IFormFileCollection files, string pathOrContainer, FileType fileType, Guid id )
    {
        await storageService.UploadAsync(pathOrContainer, files, id);
        foreach (var file in files)
        {
            switch (fileType)
            {
                case FileType.PostImage:
                    await context.PostImages.AddAsync(new()
                    {
                        PostId = id, Storage = Storage.Azure, Name = file.FileName,
                        Path = pathOrContainer, CreatedDate = DateTime.UtcNow
                    });
                    break;
                case FileType.ProfileImage:
                    await context.ProfileImages.AddAsync(new()
                    {
                        ProfileId = id, Storage = Storage.Azure, Name = file.FileName,
                        Path = pathOrContainer, CreatedDate = DateTime.UtcNow
                    });
                    break;
                case FileType.ReelsVideo:
                    await context.ReelVideos.AddAsync(new()
                    {
                        ProfileId = id, Storage = Storage.Azure, Name = file.FileName,
                        Path = pathOrContainer, CreatedDate = DateTime.UtcNow
                    });
                    break;
                case FileType.QuestionImage:
                    await context.QuestionImages.AddAsync(new()
                    {
                        QuestionId = id, Storage = Storage.Azure, Name = file.FileName,
                        Path = pathOrContainer, CreatedDate = DateTime.UtcNow
                    });
                    break;
                case FileType.Unknown:
                    break;
            }
        }
        await context.SaveChangesAsync();
        return ServiceResponse<NoContent>.Success(StatusCodes.Status200OK);
    }
}