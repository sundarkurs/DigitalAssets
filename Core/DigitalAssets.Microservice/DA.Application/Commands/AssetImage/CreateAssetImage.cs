using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetImage
{
    public class CreateAssetImage
    {
        public class Command : IRequest<Response<AssetImageDto>>
        {
            public AssetImageRequest Asset { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetImageDto>>
        {
            private readonly IAssetRepository<Domain.Models.AssetImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetImageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = _mapper.Map<Domain.Models.AssetImage>(request.Asset);

                asset.UpdatedBy = "Sundar Urs";
                asset.UpdatedOn = DateTime.UtcNow;

                var response = await _assetRepository.AddAsync(asset);

                var newAssetType = _mapper.Map<AssetImageDto>(response);

                return new Response<AssetImageDto>(newAssetType);
            }
        }
    }
}
