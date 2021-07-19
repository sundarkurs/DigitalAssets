using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.DTO.Folder;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.Folder
{
    public class EditFolder
    {
        public class Command : IRequest<Response<FolderDto>>
        {
            public FolderUpdateRequest Folder { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<FolderDto>>
        {
            private readonly IFolderRepository _folderRepository;
            private readonly IMapper _mapper;

            public Handler(IFolderRepository folderRepository, IMapper mapper)
            {
                _folderRepository = folderRepository;
                _mapper = mapper;
            }

            public async Task<Response<FolderDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var folder = await _folderRepository.GetByIdAsync(request.Folder.Id);

                if (folder == null)
                {
                    throw new ApiException($"Folder not found.");
                }

                folder.Name = request.Folder.Name;
                folder.UpdatedBy = "Sundar Urs";
                folder.UpdatedOn = DateTime.UtcNow;

                await _folderRepository.UpdateAsync(folder);

                var updatedFolder = _mapper.Map<FolderDto>(folder);

                return new Response<FolderDto>(updatedFolder);
            }
        }
    }
}
