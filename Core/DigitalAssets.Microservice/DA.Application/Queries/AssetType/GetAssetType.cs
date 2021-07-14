using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetType
{
    public class GetAssetType
    {
        public class Query : IRequest<Response<AssetTypeDto>>
        {
            public int AssetTypeId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<AssetTypeDto>>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetTypeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var assetType = await _assetTypeRepository.GetByIdAsync(request.AssetTypeId);

                if (assetType == null)
                {
                    throw new ApiException($"Asset type not found.");
                }

                var assetTypesResponse = _mapper.Map<AssetTypeDto>(assetType);
                return new Response<AssetTypeDto>(assetTypesResponse);
            }
        }
    }
}
