using DA.Application.Queries.AssetTypes;
using DA.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ActionResult<List<AssetType>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

    }
}
