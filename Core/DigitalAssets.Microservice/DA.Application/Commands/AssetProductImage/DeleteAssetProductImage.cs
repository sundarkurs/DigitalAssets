using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetProductImage
{
    public class DeleteAssetProductImage
    {
        public class Command : IRequest<Response<bool>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<bool>>
        {
            private readonly IAssetRepository<Domain.Models.AssetProductImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetProductImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<bool>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = await _assetRepository.GetByIdAsync(request.Id);

                if (asset == null)
                {
                    throw new ApiException($"Asset not found.");
                }

                try
                {
                    await _assetRepository.DeleteAsync(asset);
                    return new Response<bool>(true);
                }
                catch (Exception ex)
                {
                    return new Response<bool>("Error occurred while deleting the asset.");
                }
            }
        }
    }
}
