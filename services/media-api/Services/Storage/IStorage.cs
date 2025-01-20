using Google.Protobuf;

namespace media_api.Models.Storage;

public interface IStorage
{
    Task<List<(string fileName, string pathOrContainerName)>> UploadAsync(string containerName, List<(string fileName, ByteString fileContent)> files);
    Task DeleteAsync(string fileName, string pathOrContainerName);
    List<string> GetFiles(string pathOrContainerName);
    bool HasFile(string pathOrContainerName, string fileName);
}