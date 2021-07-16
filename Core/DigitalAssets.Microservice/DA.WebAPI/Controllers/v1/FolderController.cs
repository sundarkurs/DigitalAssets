using DA.Application.Commands.Folder;
using DA.Application.DTO.Folder;
using DA.Application.Queries.Folder;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;


namespace DA.WebAPI.Controllers.v1
{
    [ApiVersion("1.0")]
    public class FolderController : BaseApiController
    {
        private readonly ILogger<FolderController> _logger;

        public FolderController(ILogger<FolderController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{root}")]
        public async Task<IActionResult> GetFoldersByParent(Guid root)
        {
            var response = await Mediator.Send(new GetFoldersByParent.Query { Root = root });
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(FolderRequest folder)
        {
            var response = await Mediator.Send(new CreateFolder.Command { Folder = folder });
            return Ok(response);
        }
    }
}
