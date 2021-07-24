using AutoMapper;
using DA.Application.DTO.AssetProductImageFile;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;


namespace DA.Application.Queries.AssetProductImageFile
{
    public class GetAllAssetProductImageFilesWithFilter
    {
        public class Query : IRequest<PagedResponse<IEnumerable<AssetProductImageFileDto>>>
        {
            public Guid AssetId { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedResponse<IEnumerable<AssetProductImageFileDto>>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetProductImageFile> _assetFileRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetFileRepository<Domain.Models.AssetProductImageFile> assetFileRepository, IMapper mapper)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<AssetProductImageFileDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Expression<Func<Domain.Models.AssetProductImageFile, bool>> expression = x => x.AssetId == request.AssetId;

                var assetFileEntities = _assetFileRepository.GetObjectsQueryable(expression).ToList();

                var files = _mapper.Map<IEnumerable<AssetProductImageFileDto>>(assetFileEntities);

                return new PagedResponse<IEnumerable<AssetProductImageFileDto>>(files, 1, 100);
            }
        }
    }
}
