using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetType
{
    public class GetAssetType
    {
        public class Query : IRequest<AssetTypeDto>
        {
            public int AssetTypeId { get; set; }
        }

        public class Handler : IRequestHandler<Query, AssetTypeDto>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<AssetTypeDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var assetType = await _assetTypeRepository.GetByIdAsync(request.AssetTypeId);
                var assetTypesResponse = _mapper.Map<AssetTypeDto>(assetType);
                return assetTypesResponse;
            }
        }
    }
}
