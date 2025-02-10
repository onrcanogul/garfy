using media_api.Models.Enums;
using media_api.Models.Storage;
using Microsoft.AspNetCore.Mvc;

namespace media_api.Controllers;

[Route("/api/[controller]")]
public class MediaController(IMediaService mediaService, IStorageService storageService) : ControllerBase
{
    [HttpGet("{id:guid}/{fileType:int}")]
    public async Task<IActionResult> Get(Guid id, int fileType)
        => Ok(await mediaService.GetFiles(id, (FileType)fileType));

    [HttpGet("presignedurl")]
    public async Task<IActionResult> GetPresignedUrl(string container, string fileName)
        => Ok(await storageService.GeneratePresignedUrlAsync(container, fileName));

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm]Guid id, [FromForm]IFormFileCollection files, [FromForm]string container,[FromForm] int fileType)
        => Ok(await mediaService.UploadFiles(files, container, (FileType)fileType, id));
}