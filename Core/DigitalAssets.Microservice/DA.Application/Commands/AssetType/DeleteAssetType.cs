using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetType
{
    public class DeleteAssetType
    {
        public class Command : IRequest<AssetTypeDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, AssetTypeDto>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<AssetTypeDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var entity = await _assetTypeRepository.GetByIdAsync(request.Id);

                await _assetTypeRepository.DeleteAsync(entity);

                var assetType = _mapper.Map<AssetTypeDto>(entity);

                return assetType;
            }
        }
    }
}
