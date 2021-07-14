using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetType
{
    public class EditAssetType
    {
        public class Command : IRequest<Response<AssetTypeDto>>
        {
            public AssetTypeDto AssetType { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<AssetTypeDto>>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;
            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<Response<AssetTypeDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var assetType = _mapper.Map<Domain.Models.AssetType>(request.AssetType);

                await _assetTypeRepository.UpdateAsync(assetType);

                return new Response<AssetTypeDto>(request.AssetType);
            }
        }
    }
}
