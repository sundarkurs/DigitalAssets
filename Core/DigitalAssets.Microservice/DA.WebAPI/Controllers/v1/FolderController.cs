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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            var response = await Mediator.Send(new GetFolder.Query { Id = id });
            return Ok(response);
        }

        [HttpGet("{id}/parent")]
        public async Task<IActionResult> GetParentAsync(Guid id)
        {
            var response = await Mediator.Send(new GetParent.Query { Id = id });
            return Ok(response);
        }

        [HttpGet("{id}/childrens")]
        public async Task<IActionResult> GetChildrensAsync(Guid id)
        {
            var response = await Mediator.Send(new GetChildrens.Query { Id = id });
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(FolderRequest folder)
        {
            var response = await Mediator.Send(new CreateFolder.Command { Folder = folder });
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsync(Guid id, FolderUpdateRequest folder)
        {
            folder.Id = id;
            var response = await Mediator.Send(new EditFolder.Command { Folder = folder });
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var response = await Mediator.Send(new DeleteFolder.Command { Id = id });
            return Ok(response);
        }
    }
}
