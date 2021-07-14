using DA.Application.Commands.Asset;
using DA.Application.DTO.Asset;
using DA.Application.Queries.Asset;
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
            return Ok(await Mediator.Send(new GetAllAssets.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(AssetRequest asset)
        {
            var response = await Mediator.Send(new CreateAsset.Command { Asset = asset });
            return Ok(response);
        }
    }
}
