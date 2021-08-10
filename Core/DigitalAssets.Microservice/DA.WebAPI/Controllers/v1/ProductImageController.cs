using DA.Application.Commands.AssetProductImage;
using DA.Application.Commands.AssetProductImageFile;
using DA.Application.DTO.AssetProductImage;
using DA.Application.DTO.AssetProductImageFile;
using DA.Application.Queries.AssetProductImage;
using DA.Application.Queries.AssetProductImageFile;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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

        [HttpPost("{assetId}/file")]
        public async Task<IActionResult> UploadFileAsync(Guid assetId, IFormFile file)
        {
            var response = await Mediator.Send(new CreateAssetProductImageFile.Command
            {
                AssetId = assetId,
                File = file
            });

            if (response.Succeeded)
            {
                return Ok(response);
            }

            return Ok();
        }

        [HttpDelete("{assetId}/file/{fileId}/delete")]
        public async Task<IActionResult> DeleteFileAsync(Guid assetId, Guid fileId)
        {
            var response = await Mediator.Send(new DeleteAssetProductImageFile.Command { AssetId = assetId, Id = fileId });
            return Ok(response);
        }

        [HttpPut("{assetId}/file/{fileId}/default")]
        public async Task<IActionResult> SetDefaultAsync(Guid assetId, Guid fileId)
        {
            var response = await Mediator.Send(new UpdateAssetProductImageFile.Command
            {
                AssetId = assetId,
                Id = fileId,
                Type = UpdateAssetProductImageFile.FileUpdateType.SetDefault
            });
            return Ok(response);
        }

        [HttpGet("{assetId}/files")]
        public async Task<IActionResult> GetAssetFilesAsync(Guid assetId)
        {
            return Ok(await Mediator.Send(new GetAllAssetProductImageFilesWithFilter.Query { AssetId = assetId }));
        }

        [HttpGet("{assetId}/file/{fileId}")]
        public async Task<IActionResult> GetFileAsync(Guid assetId, Guid fileId)
        {
            var response = await Mediator.Send(new GetAssetProductImageFile.Query { AssetId = assetId, FileId = fileId });

            Response.Headers.Add("FileName", response.Data.Name);
            Response.Headers.Add("FileId", response.Data.Id.ToString());
            Response.Headers.Add("AssetId", response.Data.AssetId.ToString());
            //Response.Headers.Add("Cache-Control", "public, max-age=" + TimeSpan.FromMinutes(30).TotalSeconds);
            //Response.Headers.Add("Transformation", "100x100");


            return File(response.Data.Content, "image/png");
        }

        [HttpGet("{assetId}/file")]
        public async Task<IActionResult> GetFileAsync(Guid assetId, string file = "", string transformation = "")
        {
            var response = await Mediator.Send(new GetAssetProductImageFileWithFilter.Query { AssetId = assetId, File = file });

            Response.Headers.Add("FileName", response.Data.Name);
            Response.Headers.Add("FileId", response.Data.Id.ToString());
            Response.Headers.Add("AssetId", response.Data.AssetId.ToString());

            return File(response.Data.Content, "image/png");
        }
    }
}
