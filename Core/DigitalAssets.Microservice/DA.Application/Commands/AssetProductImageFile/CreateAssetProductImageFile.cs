using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.DTO.AssetImageFile;
using DA.Application.DTO.AssetProductImageFile;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetProductImageFile
{
    public class CreateAssetProductImageFile
    {
        public class Command : IRequest<Response<AssetProductImageFileDto>>
        {
            public AssetProductImageFileRequest File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetProductImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetProductImageFile> _assetFileRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetFileRepository<Domain.Models.AssetProductImageFile> assetFileRepository, IMapper mapper)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetProductImageFileDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = _mapper.Map<Domain.Models.AssetProductImageFile>(request.File);

                asset.UpdatedBy = "Sundar Urs";
                asset.UpdatedOn = DateTime.UtcNow;

                var response = await _assetFileRepository.AddAsync(asset);

                var newAssetType = _mapper.Map<AssetProductImageFileDto>(response);

                return new Response<AssetProductImageFileDto>(newAssetType);
            }
        }
    }
}
