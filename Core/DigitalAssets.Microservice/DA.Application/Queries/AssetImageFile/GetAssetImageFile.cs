using AutoMapper;
using DA.Application.DTO.AssetImageFile;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetImageFile
{
    public class GetAssetImageFile
    {
        public class Query : IRequest<Response<AssetImageFileDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<AssetImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetImageFile> _assetFileRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetFileRepository<Domain.Models.AssetImageFile> assetFileRepository, IMapper mapper)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetImageFileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var file = await _assetFileRepository.GetByIdAsync(request.Id);

                if (file == null)
                {
                    throw new ApiException($"File not found.");
                }

                var assetTypesResponse = _mapper.Map<AssetImageFileDto>(file);
                return new Response<AssetImageFileDto>(assetTypesResponse);
            }
        }
    }
}
