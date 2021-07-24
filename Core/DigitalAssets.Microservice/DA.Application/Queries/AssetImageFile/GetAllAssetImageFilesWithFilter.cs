using AutoMapper;
using DA.Application.DTO.AssetImageFile;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetImageFile
{
    public class GetAllAssetImageFilesWithFilter
    {
        public class Query : IRequest<PagedResponse<IEnumerable<AssetImageFileDto>>>
        {
            public Guid AssetId { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedResponse<IEnumerable<AssetImageFileDto>>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetImageFile> _assetFileRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetFileRepository<Domain.Models.AssetImageFile> assetFileRepository, IMapper mapper)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
            }

            public async Task<PagedResponse<IEnumerable<AssetImageFileDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Expression<Func<Domain.Models.AssetImageFile, bool>> expression = x => x.AssetId == request.AssetId;

                var assetFileEntities = _assetFileRepository.GetObjectsQueryable(expression).ToList();

                var files = _mapper.Map<IEnumerable<AssetImageFileDto>>(assetFileEntities);

                return new PagedResponse<IEnumerable<AssetImageFileDto>>(files, 1, 100);
            }
        }
    }
}
