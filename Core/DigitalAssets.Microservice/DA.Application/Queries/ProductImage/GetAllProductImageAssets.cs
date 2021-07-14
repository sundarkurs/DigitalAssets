using AutoMapper;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DA.Application.Wrappers;
using DA.Application.DTO.AssetProductImage;

namespace DA.Application.Queries.ProductImage
{
    public class GetAllProductImageAssets
    {
        public class Query : IRequest<PagedResponse<IEnumerable<AssetProductImageDto>>> { }

        public class Handler : IRequestHandler<Query, PagedResponse<IEnumerable<AssetProductImageDto>>>
        {
            private readonly IAssetRepository<Domain.Models.AssetProductImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetProductImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<AssetProductImageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var assets = await _assetRepository.GetAllAsync();
                var assetsResponse = _mapper.Map<IEnumerable<AssetProductImageDto>>(assets);
                return new PagedResponse<IEnumerable<AssetProductImageDto>>(assetsResponse, 1, 100);
            }
        }
    }
}
