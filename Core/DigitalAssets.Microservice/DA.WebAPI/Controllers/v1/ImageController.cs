using DA.Application.Commands.AssetImage;
using DA.Application.DTO.AssetImage;
using DA.Application.Queries.AssetImage;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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
            return Ok(await Mediator.Send(new GetAllAssetImages.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            return Ok(await Mediator.Send(new GetAssetImage.Query { Id = id }));
        }

        [HttpGet("folder/{folderId}")]
        public async Task<IActionResult> GetFolderAssetsAsync(Guid folderId)
        {
            return Ok(await Mediator.Send(new GetAssetImagesWithFilter.Query { FolderId = folderId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(AssetImageRequest asset)
        {
            var response = await Mediator.Send(new CreateAssetImage.Command { Asset = asset });
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsync(Guid id, AssetImageDto asset)
        {
            asset.Id = id;
            var response = await Mediator.Send(new EditAssetImage.Command { Asset = asset });
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var response = await Mediator.Send(new DeleteAssetImage.Command { Id = id });
            return Ok(response);
        }
    }
}
