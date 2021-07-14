using DA.Application.Commands.AssetProductImage;
using DA.Application.DTO.AssetProductImage;
using DA.Application.Queries.ProductImage;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
            return Ok(await Mediator.Send(new GetAllProductImageAssets.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(AssetProductImageRequest asset)
        {
            var response = await Mediator.Send(new CreateAssetProductImage.Command { Asset = asset });
            return Ok(response);
        }
    }
}
