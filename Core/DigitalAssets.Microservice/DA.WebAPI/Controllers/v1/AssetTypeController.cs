using DA.Application.Commands.AssetType;
using DA.Application.DTO.AssetType;
using DA.Application.Queries.AssetType;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace DA.WebAPI.Controllers.v1
{
    [ApiVersion("1.0")]
    public class AssetTypeController : BaseApiController
    {
        private readonly ILogger<AssetTypeController> _logger;

        public AssetTypeController(ILogger<AssetTypeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            return Ok(await Mediator.Send(new GetAllAssetTypes.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> Create(AssetTypeRequest assetType)
        {
            var response = await Mediator.Send(new CreateAssetType.Command { AssetType = assetType });
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, AssetTypeDto assetType)
        {
            assetType.Id = id;
            var response = await Mediator.Send(new EditAssetType.Command { AssetType = assetType });
            return Ok(response);
        }
    }
}
