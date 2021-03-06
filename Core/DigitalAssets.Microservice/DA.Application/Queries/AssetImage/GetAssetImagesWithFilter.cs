using AutoMapper;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DA.Application.Wrappers;
using DA.Application.DTO.AssetImage;
using System;
using System.Linq.Expressions;
using System.Linq;

namespace DA.Application.Queries.AssetImage
{
    public class GetAssetImagesWithFilter
    {
        public class Query : IRequest<PagedResponse<IEnumerable<AssetImageDto>>>
        {
            public Guid FolderId { get; set; }
        }

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
                Expression<Func<Domain.Models.AssetImage, bool>> expression = x => x.FolderId == request.FolderId;

                var assetEntities = _assetRepository.GetObjectsQueryable(expression).ToList();

                var assets = _mapper.Map<IEnumerable<AssetImageDto>>(assetEntities);

                return new PagedResponse<IEnumerable<AssetImageDto>>(assets, 1, 100);
            }
        }
    }
}
