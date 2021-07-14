using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DA.Application.Wrappers;
using DA.Application.DTO.Asset;

namespace DA.Application.Queries.Asset
{
    public class GetAllAssets
    {
        public class Query : IRequest<PagedResponse<IEnumerable<AssetDto>>> { }

        public class Handler : IRequestHandler<Query, PagedResponse<IEnumerable<AssetDto>>>
        {
            private readonly IAssetRepository<Domain.Models.AssetProductImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetProductImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<AssetDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var assets = await _assetRepository.GetAllAsync();
                var assetsResponse = _mapper.Map<IEnumerable<AssetDto>>(assets);
                return new PagedResponse<IEnumerable<AssetDto>>(assetsResponse, 1, 100);
            }
        }
    }
}
