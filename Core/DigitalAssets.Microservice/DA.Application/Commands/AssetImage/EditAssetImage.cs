using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetImage
{
    public class EditAssetImage
    {
        public class Command : IRequest<Response<AssetImageDto>>
        {
            public AssetImageDto Asset { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetImageDto>>
        {
            private readonly IAssetRepository<Domain.Models.AssetImage> _assetRepository;

            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetImageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = await _assetRepository.GetByIdAsync(request.Asset.Id);

                if (asset == null)
                {
                    throw new ApiException($"Asset not found.");
                }

                asset.Name = request.Asset.Name;
                asset.CountryCode = request.Asset.CountryCode;
                asset.LanguageCode = request.Asset.LanguageCode;
                asset.Abstract = request.Asset.Abstract;
                asset.UpdatedBy = "Sundar Urs";
                asset.UpdatedOn = DateTime.UtcNow;

                await _assetRepository.UpdateAsync(asset);

                var assetResponse = _mapper.Map<AssetImageDto>(asset);
                return new Response<AssetImageDto>(assetResponse);
            }
        }
    }
}
