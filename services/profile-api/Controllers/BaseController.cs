using Microsoft.AspNetCore.Mvc;
using profile_api.Models.Response;

namespace profile_api.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class BaseController : ControllerBase
{
    protected static IActionResult ApiResult<T>(ServiceResponse<T> response)
        => new ObjectResult(response) { StatusCode = response.StatusCode };
}

