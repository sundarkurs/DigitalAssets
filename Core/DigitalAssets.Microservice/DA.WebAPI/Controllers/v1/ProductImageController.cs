using DA.Application.Commands.AssetProductImage;
using DA.Application.DTO.AssetProductImage;
using DA.Application.Queries.AssetProductImage;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace DA.WebAPI.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ProductImageController : BaseApiController
    {
        private readonly ILogger<ProductImageController> _logger;

        public ProductImageController(ILogger<ProductImageController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await Mediator.Send(new GetAllAssetProductImage.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            return Ok(await Mediator.Send(new GetAssetProductImage.Query { Id = id }));
        }

        [HttpGet("folder/{folderId}")]
        public async Task<IActionResult> GetFolderAssetsAsync(Guid folderId)
        {
            return Ok(await Mediator.Send(new GetAssetProductImageWithFilter.Query { FolderId = folderId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(AssetProductImageRequest asset)
        {
            var response = await Mediator.Send(new CreateAssetProductImage.Command { Asset = asset });
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsync(Guid id, AssetProductImageDto asset)
        {
            asset.Id = id;
            var response = await Mediator.Send(new EditAssetProductImage.Command { Asset = asset });
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var response = await Mediator.Send(new DeleteAssetProductImage.Command { Id = id });
            return Ok(response);
        }
    }
}
