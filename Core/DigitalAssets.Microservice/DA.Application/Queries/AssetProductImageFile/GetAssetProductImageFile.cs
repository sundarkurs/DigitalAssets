using AutoMapper;
using DA.Application.DTO.AssetProductImageFile;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Interfaces.Services;
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
            public Guid AssetId { get; set; }
            public Guid FileId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<AssetProductImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetProductImageFile> _assetFileRepository;
            private readonly IMapper _mapper;
            private readonly IAssetFileService _assetFileService;

            public Handler(IAssetFileRepository<Domain.Models.AssetProductImageFile> assetFileRepository, IMapper mapper, IAssetFileService assetFileService)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
                _assetFileService = assetFileService;
            }

            public async Task<Response<AssetProductImageFileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var file = await _assetFileRepository.GetByIdAsync(request.FileId);

                var fileBlob = await _assetFileService.GetAsync(file.BlobId.ToString());

                if (file == null)
                {
                    throw new ApiException($"File not found.");
                }

                var assetTypesResponse = _mapper.Map<AssetProductImageFileDto>(file);
                assetTypesResponse.Content = fileBlob;
                return new Response<AssetProductImageFileDto>(assetTypesResponse);
            }
        }
    }
}
