using AutoMapper;
using DA.Application.DTO.AssetImageFile;
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

namespace DA.Application.Commands.AssetImageFile
{
    public class CreateAssetImageFile
    {
        public class Command : IRequest<Response<AssetImageFileDto>>
        {
            public Guid AssetId { get; set; }
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetImageFile> _assetFileRepository;
            private readonly IMapper _mapper;
            private readonly IBlobStorageService _storageService;

            public Handler(IAssetFileRepository<Domain.Models.AssetImageFile> assetFileRepository, IMapper mapper, IBlobStorageService storageService)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
                _storageService = storageService;
            }

            public async Task<Response<AssetImageFileDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                //TODO, Asset relation validation
                var identifier = Guid.NewGuid();


                using (var stream = new MemoryStream())
                {
                    request.File.CopyTo(stream);

                    var image = Image.FromStream(stream);

                    var fileData = stream.ToArray();

                    if (await _storageService.CreateOrUpdate(fileData, identifier.ToString()))
                    {
                        var file = new Domain.Models.AssetImageFile();
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

                        var newFile = _mapper.Map<AssetImageFileDto>(response);

                        return new Response<AssetImageFileDto>(newFile);
                    }

                    return new Response<AssetImageFileDto>("Error uploading a file.");
                }
            }
        }
    }
}
