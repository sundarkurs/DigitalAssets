using AutoMapper;
using DA.Application.DTO.AssetImageFile;
using DA.Application.Interfaces.Repositories;
using DA.Application.Interfaces.Services;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetImageFile
{
    public class CreateAssetImageFile
    {
        public class Command : IRequest<Response<AssetImageFileDto>>
        {
            public Guid AssetId { get; set; }
            public string FileName { get; set; }
            public byte[] FileData { get; set; }
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
                var identifier = System.Guid.NewGuid();
                if (_storageService.CreateOrUpdate(request.FileData, identifier.ToString()))
                {
                    var file = new Domain.Models.AssetImageFile();
                    file.Name = request.FileName;
                    file.Size = request.FileData.Length;
                    file.AssetId = request.AssetId;
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
