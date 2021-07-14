using AutoMapper;
using DA.Application.DTO.Asset;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.Asset
{
    public class CreateAsset
    {
        public class Command : IRequest<Response<AssetDto>>
        {
            public AssetRequest Asset { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetDto>>
        {
            private readonly IAssetRepository _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = _mapper.Map<Domain.Models.AssetProductImage>(request.Asset);

                var response = await _assetRepository.AddAsync(asset);

                var newAssetType = _mapper.Map<AssetDto>(response);

                return new Response<AssetDto>(newAssetType);
            }
        }
    }
}
