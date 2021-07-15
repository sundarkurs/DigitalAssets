using AutoMapper;
using DA.Application.DTO.AssetProductImage;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetProductImage
{
    public class GetAssetProductImage
    {
        public class Query : IRequest<Response<AssetProductImageDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<AssetProductImageDto>>
        {
            private readonly IAssetRepository<Domain.Models.AssetImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetProductImageDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var asset = await _assetRepository.GetByIdAsync(request.Id);

                if (asset == null)
                {
                    throw new ApiException($"Asset not found.");
                }

                var assetTypesResponse = _mapper.Map<AssetProductImageDto>(asset);
                return new Response<AssetProductImageDto>(assetTypesResponse);
            }
        }
    }
}
