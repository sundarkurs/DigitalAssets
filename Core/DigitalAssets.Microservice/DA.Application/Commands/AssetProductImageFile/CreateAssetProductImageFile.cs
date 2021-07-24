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
            public Guid AssetId { get; set; }
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
                // TODO : Asset reference validation

                var file = _mapper.Map<Domain.Models.AssetProductImageFile>(request.File);

                file.AssetId = request.AssetId;
                file.UpdatedBy = "Sundar Urs";
                file.UpdatedOn = DateTime.UtcNow;

                var response = await _assetFileRepository.AddAsync(file);

                var newAssetType = _mapper.Map<AssetProductImageFileDto>(response);

                return new Response<AssetProductImageFileDto>(newAssetType);
            }
        }
    }
}
