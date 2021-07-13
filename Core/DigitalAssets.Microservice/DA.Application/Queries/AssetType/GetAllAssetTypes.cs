using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DA.Application.Wrappers;

namespace DA.Application.Queries.AssetType
{
    public class GetAllAssetTypes
    {
        public class Query : IRequest<PagedResponse<IEnumerable<AssetTypeDto>>> { }

        public class Handler : IRequestHandler<Query, PagedResponse<IEnumerable<AssetTypeDto>>>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<AssetTypeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var assetTypes = await _assetTypeRepository.GetAllAsync();
                var assetTypesResponse = _mapper.Map<IEnumerable<AssetTypeDto>>(assetTypes);
                return new PagedResponse<IEnumerable<AssetTypeDto>>(assetTypesResponse, 1, 100);

            }
        }
    }
}
