using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetImage
{
    public class EditAssetImage
    {
        public class Command : IRequest<Response<AssetImageDto>>
        {
            public AssetImageDto Asset { get; set; }
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

                if (asset == null)
                {
                    throw new ApiException($"Asset not found.");
                }

                asset.UpdatedBy = "Sundar Urs";
                asset.UpdatedOn = DateTime.UtcNow;

                await _assetRepository.UpdateAsync(asset);

                return new Response<AssetImageDto>(request.Asset);
            }
        }
    }
}
