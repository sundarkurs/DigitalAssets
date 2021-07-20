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


namespace DA.Application.Commands.AssetType
{
    public class DisableAssetType
    {
        public class Command : IRequest<Response<bool>>
        {
            public int Id { get; set; }
            public bool Disable { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<bool>>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<Response<bool>> Handle(Command request, CancellationToken cancellationToken)
            {
                var assetType = await _assetTypeRepository.GetByIdAsync(request.Id);

                if (assetType == null)
                {
                    throw new ApiException($"Asset type not found.");
                }

                assetType.Disabled = request.Disable;
                await _assetTypeRepository.UpdateAsync(assetType);

                return new Response<bool>(true);
            }
        }
    }
}
