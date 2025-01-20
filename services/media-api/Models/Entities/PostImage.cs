using media_api.Models.Enums;

namespace media_api.Models.Entities;

public class PostImage : File
{
    public Guid PostId { get; set; }
    public override FileType FileType => FileType.PostImage;
}