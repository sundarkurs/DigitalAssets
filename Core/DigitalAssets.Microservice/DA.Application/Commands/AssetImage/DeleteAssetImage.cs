using AutoMapper;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetImage
{
    public class DeleteAssetImage
    {
        public class Command : IRequest<Response<bool>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<bool>>
        {
            private readonly IAssetRepository<Domain.Models.AssetImage> _assetRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetRepository<Domain.Models.AssetImage> assetRepository, IMapper mapper)
            {
                _assetRepository = assetRepository;
                _mapper = mapper;
            }

            public async Task<Response<bool>> Handle(Command request, CancellationToken cancellationToken)
            {
                var asset = await _assetRepository.GetByIdAsync(request.Id);

                if (asset == null)
                {
                    // TODO: Check message shown on the UI
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
