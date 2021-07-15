using AutoMapper;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DA.Application.Wrappers;
using DA.Application.DTO.AssetImage;

namespace DA.Application.Queries.AssetImage
{
    public class GetAllAssetImage
    {
        public class Query : IRequest<PagedResponse<IEnumerable<AssetImageDto>>> { }

        public class Handler : IRequestHandler<Query, PagedResponse<IEnumerable<AssetImageDto>>>
        {
            private readonly IAssetRepository<Domain.Models.AssetImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<AssetImageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var assets = await _assetRepository.GetAllAsync();
                var assetsResponse = _mapper.Map<IEnumerable<AssetImageDto>>(assets);
                return new PagedResponse<IEnumerable<AssetImageDto>>(assetsResponse, 1, 100);
            }
        }
    }
}
