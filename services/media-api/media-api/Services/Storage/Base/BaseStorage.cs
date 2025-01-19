namespace media_api.Models.Storage;

public class BaseStorage
{
    protected delegate bool HasFile(string pathOrContainerName, string fileName);
    protected string FileRename(string pathOrContainerName, string fileName, HasFile hasFile, int num = 0)
    {
        string newFileName;
        var extension = Path.GetExtension(fileName);
        if (num == 0)
        {
            var oldName = Path.GetFileNameWithoutExtension(fileName);
            newFileName = NameOperation.CharacterRegulatory(oldName) + extension;
        }
        else
            newFileName = fileName;
        return hasFile(pathOrContainerName, newFileName) 
            ? FileRename(pathOrContainerName, $"{Path.GetFileNameWithoutExtension(newFileName)}-{num}{extension}", hasFile, ++num)
            : newFileName;
    }
}