using media_api.Infrastructure;
using media_api.Models.Enums;
using media_api.Models.Storage;
using Media.Grpc;
using Microsoft.EntityFrameworkCore;
using FileType = Media.Grpc.FileType;

namespace media_api.Services;

public class MediaService(MediaDbContext context, IStorageService storageService) : MediaProtoService.MediaProtoServiceBase
{
    public async Task<GetResponse> GetFiles(GetRequest request)
    {
        var query = request.FileType switch
        {
            FileType.PostImage => context.PostImages.Where(image => image.PostId.ToString() == request.Id),
            FileType.ProfileImage => context.ProfileImages.Where(image => image.ProfileId.ToString() == request.Id),
            FileType.ReelsVideo => context.ReelVideos.Where(video => video.ProfileId.ToString() == request.Id),
            _ => Enumerable.Empty<Models.Entities.File>().AsQueryable()
        };
        var files = await query.Select(x => new FileModel
        {
            Id = x.Id.ToString(),
            Name = x.Name,
            Path = x.Path
        }).ToListAsync();
        return new GetResponse { Files = { files } };
    }
    
    
    public async Task<UploadResponse> UploadFiles(UploadRequest request)
    {
        foreach (var file in request.Files)
        {
            var fileType = file.FileType;
            await storageService.UploadAsync(file.PathOrContainer, new() { (file.FileName, file.FileContent) });
            switch (fileType)
            {
                case FileType.PostImage:
                    await context.PostImages.AddAsync(new()
                    {
                        PostId = Guid.Parse(file.Id), Storage = Storage.Azure, Name = file.FileName,
                        Path = file.PathOrContainer, CreatedDate = DateTime.UtcNow
                    });
                    break;
                case FileType.ProfileImage:
                    await context.ProfileImages.AddAsync(new()
                    {
                        ProfileId = Guid.Parse(file.Id), Storage = Storage.Azure, Name = file.FileName,
                        Path = file.PathOrContainer, CreatedDate = DateTime.UtcNow
                    });
                    break;
                case FileType.ReelsVideo:
                    await context.ReelVideos.AddAsync(new()
                    {
                        ProfileId = Guid.Parse(file.Id), Storage = Storage.Azure, Name = file.FileName,
                        Path = file.PathOrContainer, CreatedDate = DateTime.UtcNow
                    });
                    break;
                case FileType.Unknown:
                    break;
            }
        }
        await context.SaveChangesAsync();
        return new UploadResponse();
    }
}