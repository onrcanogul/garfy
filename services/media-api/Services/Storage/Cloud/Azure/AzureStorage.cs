using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace media_api.Models.Storage.Cloud.Azure;

public class AzureStorage : BaseStorage, IAzureStorage
{
    private readonly BlobServiceClient _blobServiceClient;
    private BlobContainerClient _blobContainerClient;

    public AzureStorage(IConfiguration configuration)
    {
        _blobServiceClient = new(configuration["Storage:Azure"]);
    }

    public async Task DeleteAsync(string fileName, string containerName)
    {
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        BlobClient blobClient = _blobContainerClient.GetBlobClient(fileName);
        await blobClient.DeleteAsync();
    }

    public List<string> GetFiles(string containerName)
    => _blobServiceClient.GetBlobContainerClient(containerName).GetBlobs().Select(b => b.Name).ToList();
    public bool HasFile(string containerName, string fileName)
    => _blobServiceClient.GetBlobContainerClient(containerName).GetBlobs().Any(b => b.Name == fileName);
    public async Task<List<(string fileName, string pathOrContainerName)>> UploadAsync(string containerName, IFormFileCollection files)
    {
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        await _blobContainerClient.CreateIfNotExistsAsync();
        await _blobContainerClient.SetAccessPolicyAsync(PublicAccessType.BlobContainer);
        List<(string fileName, string pathOrContainerName)> newFiles = new();
        foreach(var file in files)
        {
           var fileNewName = FileRename(containerName, file.Name, HasFile);
            var blobClient = _blobContainerClient.GetBlobClient(fileNewName);
            await blobClient.UploadAsync(file.OpenReadStream());
            newFiles.Add((fileNewName, $"{containerName}/{fileNewName}"));
        }
        return newFiles;

    }
}