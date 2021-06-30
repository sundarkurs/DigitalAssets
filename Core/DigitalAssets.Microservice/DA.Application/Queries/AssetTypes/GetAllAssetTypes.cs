using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetTypes
{
    public class GetAllAssetTypes
    {
        public class Query : IRequest<IEnumerable<AssetTypeResponse>> { }

        public class Handler : IRequestHandler<Query, IEnumerable<AssetTypeResponse>>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<IEnumerable<AssetTypeResponse>> Handle(Query request, CancellationToken cancellationToken)
            {
                var assetTypes = await _assetTypeRepository.GetAllAsync();
                var assetTypesResponse = _mapper.Map<IEnumerable<AssetTypeResponse>>(assetTypes);
                return assetTypesResponse;
            }
        }
    }
}
