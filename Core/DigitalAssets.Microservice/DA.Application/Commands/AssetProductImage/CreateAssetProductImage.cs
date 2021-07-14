using AutoMapper;
using DA.Application.DTO.AssetProductImage;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetProductImage
{
    public class CreateAssetProductImage
    {
        public class Command : IRequest<Response<AssetProductImageDto>>
        {
            public AssetProductImageRequest Asset { get; set; }
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

                var response = await _assetRepository.AddAsync(asset);

                var newAssetType = _mapper.Map<AssetProductImageDto>(response);

                return new Response<AssetProductImageDto>(newAssetType);
            }
        }
    }
}
