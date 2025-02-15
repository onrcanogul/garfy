using media_api.Models.Enums;

namespace media_api.Models.Entities;

public class QuestionImage : File
{
    public Guid QuestionId { get; set; }
    public override FileType FileType => FileType.QuestionImage;
}