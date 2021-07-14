using DA.Application.Commands.AssetImage;
using DA.Application.DTO.AssetImage;
using DA.Application.Queries.Image;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;


namespace DA.WebAPI.Controllers.v1
{
    
    [ApiVersion("1.0")]
    public class ImageController : BaseApiController
    {
        private readonly ILogger<ImageController> _logger;

        public ImageController(ILogger<ImageController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await Mediator.Send(new GetAllImageAssets.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(AssetImageRequest asset)
        {
            var response = await Mediator.Send(new CreateAssetImage.Command { Asset = asset });
            return Ok(response);
        }
    }
}
