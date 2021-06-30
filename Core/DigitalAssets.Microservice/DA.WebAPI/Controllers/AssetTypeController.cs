using DA.Application.Commands.AssetType;
using DA.Application.DTO.AssetType;
using DA.Application.Queries.AssetType;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace DA.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetTypeController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly ILogger<AssetTypeController> _logger;

        public AssetTypeController(ILogger<AssetTypeController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            return Ok(await _mediator.Send(new GetAllAssetTypes.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> Create(AssetTypeRequest assetType)
        {
            var response = await _mediator.Send(new CreateAssetType.Command { AssetType = assetType });
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, AssetTypeDto assetType)
        {
            assetType.Id = id;
            var response = await _mediator.Send(new EditAssetType.Command { AssetType = assetType });
            return Ok(response);
        }
    }
}
