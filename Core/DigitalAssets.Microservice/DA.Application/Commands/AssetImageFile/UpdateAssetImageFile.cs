using AutoMapper;
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
    public class UpdateAssetImageFile
    {
        public enum FileUpdateType
        {
            SetDefault
        }

        public class Command : IRequest<Response<bool>>
        {
            public Guid AssetId { get; set; }
            public Guid Id { get; set; }
            public FileUpdateType Type { get; set; }
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
                //TODO: Asset reference validation

                var file = await _assetFileRepository.GetByIdAsync(request.Id);

                if (file == null)
                {
                    throw new ApiException($"File not found.");
                }

                try
                {
                    //TODO: update other default file to false
                    if (request.Type == FileUpdateType.SetDefault)
                    {
                        file.IsDefault = true;
                        await _assetFileRepository.UpdateAsync(file);
                    }

                    return new Response<bool>(true);
                }
                catch (Exception ex)
                {
                    return new Response<bool>("Error occurred while updating the file.");
                }
            }
        }
    }
}
