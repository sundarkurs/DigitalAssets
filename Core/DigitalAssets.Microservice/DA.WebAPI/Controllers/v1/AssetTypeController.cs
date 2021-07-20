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

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            return Ok(await Mediator.Send(new GetAssetType.Query { Id = id }));
        }

        [HttpGet("{code}/code")]
        public async Task<IActionResult> GetByCodeAsync(string code)
        {
            return Ok(await Mediator.Send(new GetAssetType.Query { Code = code }));
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
            var response = await Mediator.Send(new DisableAssetType.Command { Id = id, Disable = true });
            return Ok(response);
        }

        [HttpPut("{id}/enable")]
        public async Task<IActionResult> EnableAsync(int id)
        {
            var response = await Mediator.Send(new DisableAssetType.Command { Id = id, Disable = false });
            return Ok(response);
        }
    }
}
