using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.DTO.AssetImageFile;
using DA.Application.Interfaces.Repositories;
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
            public AssetImageFileRequest File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetImageFile> _assetFileRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetFileRepository<Domain.Models.AssetImageFile> assetFileRepository, IMapper mapper)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetImageFileDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = _mapper.Map<Domain.Models.AssetImageFile>(request.File);

                asset.UpdatedBy = "Sundar Urs";
                asset.UpdatedOn = DateTime.UtcNow;

                var response = await _assetFileRepository.AddAsync(asset);

                var newAssetType = _mapper.Map<AssetImageFileDto>(response);

                return new Response<AssetImageFileDto>(newAssetType);
            }
        }
    }
}
