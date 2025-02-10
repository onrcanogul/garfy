using media_api.Infrastructure;
using media_api.Models.Enums;
using media_api.Models.Response;
using media_api.Models.Storage;
using Microsoft.EntityFrameworkCore;
using File = media_api.Models.Entities.File;
using FileType = media_api.Models.Enums.FileType;

namespace media_api.Services;

public class MediaService(MediaDbContext context, IStorageService storageService) : IMediaService
{
    public async Task<ServiceResponse<List<File>>> GetFiles(Guid id, FileType fileType)
    {
        var query = fileType switch
        {
            FileType.PostImage => context.PostImages.Where(image => image.PostId == id),
            FileType.ProfileImage => context.ProfileImages.Where(image => image.ProfileId == id),
            FileType.ReelsVideo => context.ReelVideos.Where(video => video.ProfileId == id),
            _ => Enumerable.Empty<File>().AsQueryable()
        };
        var files = await query.ToListAsync();
        return ServiceResponse<List<File>>.Success(files, StatusCodes.Status200OK);
    }
    public async Task<ServiceResponse<NoContent>> UploadFiles(IFormFileCollection files, string pathOrContainer, FileType fileType, Guid id )
    {
        Console.WriteLine("Pingaldo");
        foreach (var file in files)
        {
            await storageService.UploadAsync(pathOrContainer, files);
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
                case FileType.Unknown:
                    break;
            }
        }
        await context.SaveChangesAsync();
        return ServiceResponse<NoContent>.Success(StatusCodes.Status200OK);
    }
}