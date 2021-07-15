using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.DTO.AssetProductImage;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetProductImage
{
    public class EditAssetProductImage
    {
        public class Command : IRequest<Response<AssetProductImageDto>>
        {
            public AssetProductImageDto Asset { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetProductImageDto>>
        {
            private readonly IAssetRepository<Domain.Models.AssetProductImage> _assetRepository;

            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetProductImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetProductImageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = _mapper.Map<Domain.Models.AssetProductImage>(request.Asset);

                if (asset == null)
                {
                    throw new ApiException($"Asset not found.");
                }

                await _assetRepository.UpdateAsync(asset);

                return new Response<AssetProductImageDto>(request.Asset);
            }
        }
    }
}
