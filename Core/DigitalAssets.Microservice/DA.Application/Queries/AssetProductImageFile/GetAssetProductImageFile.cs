using AutoMapper;
using DA.Application.DTO.AssetProductImageFile;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetProductImageFile
{
    public class GetAssetProductImageFile
    {
        public class Query : IRequest<Response<AssetProductImageFileDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<AssetProductImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetProductImageFile> _assetFileRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetFileRepository<Domain.Models.AssetProductImageFile> assetFileRepository, IMapper mapper)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetProductImageFileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var file = await _assetFileRepository.GetByIdAsync(request.Id);

                if (file == null)
                {
                    throw new ApiException($"File not found.");
                }

                var assetTypesResponse = _mapper.Map<AssetProductImageFileDto>(file);
                return new Response<AssetProductImageFileDto>(assetTypesResponse);
            }
        }
    }
}
