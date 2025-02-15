namespace media_api.Models.Storage;

public class BaseStorage
{
    protected delegate bool HasFile(string pathOrContainerName, string fileName);
    protected static string FileRename(string pathOrContainerName, string fileName, HasFile hasFile, Guid id)
    {
        var extension = Path.GetExtension(fileName);
        var nameWithoutExtension = NameOperation.CharacterRegulatory(Path.GetFileNameWithoutExtension(fileName));
        var newFileName = nameWithoutExtension + "_" + id + extension;
        var num = 0;
        while (hasFile(pathOrContainerName, newFileName))
        {
            newFileName = $"{nameWithoutExtension}-{++num}{extension}";
        }
        return newFileName;
    }
}