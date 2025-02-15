
namespace media_api.Models.Storage;

public class StorageService(IStorage storage) : IStorageService
{
    public Enums.Storage Storage { get; }
    public Task<List<(string fileName, string pathOrContainerName)>> UploadAsync(string pathOrContainerName, IFormFileCollection files, Guid id)
        => storage.UploadAsync(pathOrContainerName, files, id);

    public Task DeleteAsync(string fileName, string pathOrContainerName)
        => storage.DeleteAsync(fileName, pathOrContainerName);
    public List<string> GetFiles(string pathOrContainerName, Guid id)
        => storage.GetFiles(pathOrContainerName, id);
    public bool HasFile(string pathOrContainerName, string fileName)
        => storage.HasFile(pathOrContainerName, fileName);

    public Task<(string UploadUrl, string FileUrl)> GeneratePresignedUrlAsync(string containerName, string fileName)
        => storage.GeneratePresignedUrlAsync(containerName, fileName);
}