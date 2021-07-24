using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.DTO.AssetImageFile;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.AssetImageFile
{
    public class DeleteAssetImageFile
    {
        public class Command : IRequest<Response<bool>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<bool>>
        {
            private readonly IAssetFileRepository<Domain.Models.AssetImageFile> _assetFileRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetFileRepository<Domain.Models.AssetImageFile> assetFileRepository, IMapper mapper)
            {
                _assetFileRepository = assetFileRepository;
                _mapper = mapper;
            }

            public async Task<Response<bool>> Handle(Command request, CancellationToken cancellationToken)
            {
                var file = await _assetFileRepository.GetByIdAsync(request.Id);

                if (file == null)
                {
                    throw new ApiException($"File not found.");
                }

                await _assetFileRepository.DeleteAsync(file);

                return new Response<bool>(true);
            }
        }
    }
}
