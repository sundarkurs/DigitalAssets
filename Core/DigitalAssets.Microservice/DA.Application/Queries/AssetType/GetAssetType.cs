using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetType
{
    public class GetAssetType
    {
        public class Query : IRequest<Response<AssetTypeDto>>
        {
            public int Id { get; set; }
            public string Code { get; set; }
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
                if (!string.IsNullOrEmpty(request.Code))
                {
                    Expression<Func<Domain.Models.AssetType, bool>> expression = x => x.Code == request.Code;
                    var type = _assetTypeRepository.GetObjectsQueryable(expression).FirstOrDefault();

                    var typeResponse = _mapper.Map<AssetTypeDto>(type);
                    return new Response<AssetTypeDto>(typeResponse);
                }

                var assetType = await _assetTypeRepository.GetByIdAsync(request.Id);

                if (assetType == null)
                {
                    throw new ApiException($"Asset type not found.");
                }

                var assetTypeResponse = _mapper.Map<AssetTypeDto>(assetType);
                return new Response<AssetTypeDto>(assetTypeResponse);
            }
        }
    }
}
