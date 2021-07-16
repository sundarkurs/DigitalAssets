using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Application.DTO.Folder;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using FluentValidation;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace DA.Application.Commands.Folder
{
    public class CreateFolder
    {
        public class Command : IRequest<Response<FolderDto>>
        {
            public FolderRequest Folder { get; set; }
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
                var folder = _mapper.Map<Domain.Models.Folder>(request.Folder);

                folder.UpdatedBy = "Sundar Urs";
                folder.UpdatedOn = DateTime.UtcNow;

                var response = await _folderRepository.AddAsync(folder);

                var newFolder = _mapper.Map<FolderDto>(response);

                return new Response<FolderDto>(newFolder);
            }
        }
    }
}
