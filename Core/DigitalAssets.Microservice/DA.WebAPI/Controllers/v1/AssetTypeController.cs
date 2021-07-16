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
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await Mediator.Send(new GetAllAssetTypes.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            return Ok(await Mediator.Send(new GetAssetType.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(AssetTypeRequest assetType)
        {
            var response = await Mediator.Send(new CreateAssetType.Command { AssetType = assetType });
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsync(int id, AssetTypeDto assetType)
        {
            assetType.Id = id;
            var response = await Mediator.Send(new EditAssetType.Command { AssetType = assetType });
            return Ok(response);
        }

        [HttpPut("{id}/disable")]
        public async Task<IActionResult> DisableAsync(int id)
        {
            var response = await Mediator.Send(new DisableAssetType.Command { Id = id });
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var response = await Mediator.Send(new DeleteAssetType.Command { Id = id });
            return Ok(response);
        }
    }
}
