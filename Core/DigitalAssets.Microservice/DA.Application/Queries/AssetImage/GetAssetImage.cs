using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetImage
{
    public class GetAssetImage
    {
        public class Query : IRequest<Response<AssetImageDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<AssetImageDto>>
        {
            private readonly IAssetRepository<Domain.Models.AssetImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetImageDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var asset = await _assetRepository.GetByIdAsync(request.Id);

                if (asset == null)
                {
                    throw new ApiException($"Asset not found.");
                }

                var assetTypesResponse = _mapper.Map<AssetImageDto>(asset);
                return new Response<AssetImageDto>(assetTypesResponse);
            }
        }
    }
}
