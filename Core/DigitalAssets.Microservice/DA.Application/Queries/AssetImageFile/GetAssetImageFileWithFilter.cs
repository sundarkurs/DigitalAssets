﻿using AutoMapper;
using DA.Application.DTO.AssetImageFile;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Interfaces.Services;
using DA.Application.Utility;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.AssetImageFile
{
    public class GetAssetImageFileWithFilter
    {
        public class Query : IRequest<Response<AssetImageFileDto>>
        {
            public Guid AssetId { get; set; }
            public string File { get; set; }
            public string Transformation { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<AssetImageFileDto>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetImageFile> _assetFileRepository;
            private readonly IMapper _mapper;
            private readonly IAssetFileStorageService _assetFileService;
            private readonly IImageProcessorService _imageProcessorService;

            public Handler(IAssetFileRepository<Domain.Models.AssetImageFile> assetFileRepository,
                IMapper mapper,
                IAssetFileStorageService assetFileService,
                IImageProcessorService imageProcessorService)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
                _assetFileService = assetFileService;
                _imageProcessorService = imageProcessorService;
            }

            public async Task<Response<AssetImageFileDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                Domain.Models.AssetImageFile file = null;

                if (string.IsNullOrEmpty(request.File))
                {
                    Expression<Func<Domain.Models.AssetImageFile, bool>> expression = x => x.AssetId == request.AssetId && x.IsDefault == true;
                    file = _assetFileRepository.GetObjectsQueryable(expression).FirstOrDefault();

                    if (file == null)
                    {
                        expression = x => x.AssetId == request.AssetId;
                        file = _assetFileRepository.GetObjectsQueryable(expression).OrderByDescending(a => a.UpdatedOn).FirstOrDefault();
                    }
                }

                if (file == null)
                {
                    throw new ApiException($"File not found.");
                }

                var fileBlob = await _assetFileService.GetAsync(file.BlobId.ToString());

                var transformation = Formatter.GetTransformationModel(request.Transformation);
                if (transformation != null)
                {
                    if (transformation.Thumbnail)
                    {
                        fileBlob = _imageProcessorService.Resize(fileBlob, transformation.Width, transformation.Height, "image/png");
                    }
                    else if (transformation.Resize)
                    {
                        fileBlob = _imageProcessorService.Resize(fileBlob, transformation.Width, transformation.Height, "image/png");
                    }
                }

                var assetTypesResponse = _mapper.Map<AssetImageFileDto>(file);
                assetTypesResponse.Content = fileBlob;
                return new Response<AssetImageFileDto>(assetTypesResponse);
            }
        }
    }
}
