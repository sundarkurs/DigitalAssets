using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetType
{
    public class CreateAssetType
    {
        public class Command : IRequest<Response<AssetTypeDto>>
        {
            public AssetTypeRequest AssetType { get; set; }
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

                assetType.Disabled = false;
                var response = await _assetTypeRepository.AddAsync(assetType);

                var newAssetType = _mapper.Map<AssetTypeDto>(response);

                return new Response<AssetTypeDto>(newAssetType);
            }
        }

        public class Validation : AbstractValidator<Command>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;

            public Validation(IAssetTypeRepository assetTypeRepository)
            {
                _assetTypeRepository = assetTypeRepository;

                RuleFor(p => p.AssetType.Code)
                    .NotEmpty().WithMessage("{PropertyName} is required.")
                    .NotNull()
                    .MaximumLength(100).WithMessage("{PropertyName} must not exceed 50 characters.")
                    .MustAsync(IsUniqueCode).WithMessage("{PropertyName} already exists.");

                RuleFor(p => p.AssetType.Name)
                    .NotEmpty().WithMessage("{PropertyName} is required.")
                    .NotNull()
                    .MaximumLength(100).WithMessage("{PropertyName} must not exceed 50 characters.");

            }

            private async Task<bool> IsUniqueCode(string code, CancellationToken cancellationToken)
            {
                var response = await _assetTypeRepository.IsCodeUniqueAsync(code);
                return response;
            }
        }
    }
}
