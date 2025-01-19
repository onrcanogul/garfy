namespace media_api.Models.Storage;

public interface IStorageService : IStorage
{
    public Enums.Storage Storage { get;  }
}