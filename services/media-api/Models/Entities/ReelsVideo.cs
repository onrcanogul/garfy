using media_api.Models.Enums;

namespace media_api.Models.Entities;

public class ReelsVideo : File
{
    public Guid ProfileId { get; set; }
    public override FileType FileType => FileType.ReelsVideo;
}