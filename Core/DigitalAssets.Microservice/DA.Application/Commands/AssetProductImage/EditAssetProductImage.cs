using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.DTO.AssetProductImage;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetProductImage
{
    public class EditAssetProductImage
    {
        public class Command : IRequest<Response<AssetProductImageDto>>
        {
            public AssetProductImageDto Asset { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetProductImageDto>>
        {
            private readonly IAssetRepository<Domain.Models.AssetProductImage> _assetRepository;

            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetProductImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetProductImageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = await _assetRepository.GetByIdAsync(request.Asset.Id);

                if (asset == null)
                {
                    throw new ApiException($"Asset not found.");
                }

                asset.Name = request.Asset.Name;
                asset.CountryCode = request.Asset.CountryCode;
                asset.LanguageCode = request.Asset.LanguageCode;
                asset.Product = request.Asset.Product;
                asset.Sku = request.Asset.Sku;
                asset.UpdatedBy = "Sundar Urs";
                asset.UpdatedOn = DateTime.UtcNow;

                await _assetRepository.UpdateAsync(asset);

                var assetResponse = _mapper.Map<AssetProductImageDto>(asset);
                return new Response<AssetProductImageDto>(assetResponse);
            }
        }
    }
}
