using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Google.Protobuf;

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

    public List<string> GetFiles(string containerName, Guid id)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        return containerClient.GetBlobs()
            .Where(blobItem => blobItem.Name.Split(".")[0].EndsWith(id.ToString()))
            .Select(blobItem => containerClient.GetBlobClient(blobItem.Name).Uri.ToString())
            .ToList();
    }

    public bool HasFile(string containerName, string fileName)
    => _blobServiceClient.GetBlobContainerClient(containerName).GetBlobs().Any(b => b.Name == fileName);

    public async Task<(string UploadUrl, string FileUrl)> GeneratePresignedUrlAsync(string containerName, string fileName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        var blobClient = containerClient.GetBlobClient(fileName);

        var sasBuilder = new BlobSasBuilder
        {
            BlobContainerName = containerName,
            BlobName = fileName,
            Resource = "b",
            StartsOn = DateTimeOffset.UtcNow,
            ExpiresOn = DateTimeOffset.UtcNow.AddHours(2)
        };
        sasBuilder.SetPermissions(BlobSasPermissions.Write);

        var sasToken = containerClient.GenerateSasUri(sasBuilder).Query;
        var uploadUrl = $"{blobClient.Uri}{sasToken}";

        return (UploadUrl: uploadUrl, FileUrl: blobClient.Uri.ToString());
    }

    public async Task<List<(string fileName, string pathOrContainerName)>> UploadAsync(string containerName, IFormFileCollection files, Guid id)
    {
        _blobContainerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        if (!await _blobContainerClient.ExistsAsync())
        {
            await _blobContainerClient.CreateAsync();
            await _blobContainerClient.SetAccessPolicyAsync(PublicAccessType.BlobContainer);
        }

        List<(string fileName, string pathOrContainerName)> datas = new();
        var uploadTasks = new List<Task>();

        foreach (var file in files)
        {
            var fileNewName = FileRename(containerName, file.FileName, HasFile, id);
            var blobClient = _blobContainerClient.GetBlobClient(fileNewName);
            var uploadTask = Task.Run(async () =>
            {
                await blobClient.UploadAsync(file.OpenReadStream());
            });
            uploadTasks.Add(uploadTask);
            datas.Add((fileNewName, $"{containerName}/{fileNewName}"));
        }
        await Task.WhenAll(uploadTasks);

        Console.WriteLine("Uploading files finished");
        return datas;
    }


}