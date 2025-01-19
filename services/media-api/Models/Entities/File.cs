using media_api.Models.Enums;

namespace media_api.Models.Entities;

public class File
{
    public Guid Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public string Path { get; set; } = null!;
    public string Name { get; set; } = null!;
    public virtual FileType FileType { get; set; }
    public virtual Enums.Storage Storage { get; set; }    
}