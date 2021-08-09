using AutoMapper;
using DA.Application.DTO.AssetProductImageFile;
using DA.Application.Interfaces.Repositories;
using DA.Application.Interfaces.Services;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Drawing;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetProductImageFile
{
    public class CreateAssetProductImageFile
    {
        public class Command : IRequest<Response<AssetProductImageFileDto>>
        {
            public Guid AssetId { get; set; }
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetProductImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetProductImageFile> _assetFileRepository;
            private readonly IMapper _mapper;
            private readonly IAssetFileService _assetFileService;

            public Handler(IAssetFileRepository<Domain.Models.AssetProductImageFile> assetFileRepository, IMapper mapper, IAssetFileService assetFileService)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
                _assetFileService = assetFileService;
            }

            public async Task<Response<AssetProductImageFileDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var identifier = Guid.NewGuid();


                using (var stream = new MemoryStream())
                {
                    request.File.CopyTo(stream);

                    var image = Image.FromStream(stream);

                    var fileData = stream.ToArray();

                    if (await _assetFileService.SaveAsync(fileData, identifier.ToString()))
                    {
                        var file = new Domain.Models.AssetProductImageFile();
                        file.AssetId = request.AssetId;
                        file.Name = Path.ChangeExtension(request.File.FileName, null);
                        file.Size = fileData.Length;
                        file.Height = image.Height;
                        file.Width = image.Width;
                        file.BlobId = identifier;
                        file.Version = "1";
                        file.IsDefault = false;
                        file.UpdatedBy = "Sundar Urs";
                        file.UpdatedOn = DateTime.UtcNow;

                        var response = await _assetFileRepository.AddAsync(file);

                        var newFile = _mapper.Map<AssetProductImageFileDto>(response);

                        return new Response<AssetProductImageFileDto>(newFile);
                    }

                    return new Response<AssetProductImageFileDto>("Error uploading a file.");
                }
            }
        }
    }
}
