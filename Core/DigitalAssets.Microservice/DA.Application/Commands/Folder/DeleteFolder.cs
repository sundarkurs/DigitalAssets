using AutoMapper;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Commands.Folder
{
    public class DeleteFolder
    {
        public class Command : IRequest<Response<bool>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Response<bool>>
        {
            private readonly IFolderRepository _folderRepository;
            private readonly IMapper _mapper;

            public Handler(IFolderRepository folderRepository, IMapper mapper)
            {
                _folderRepository = folderRepository;
                _mapper = mapper;
            }

            public async Task<Response<bool>> Handle(Command request, CancellationToken cancellationToken)
            {
                var folder = await _folderRepository.GetByIdAsync(request.Id);

                if (folder == null)
                {
                    throw new ApiException($"Folder not found.");
                }

                await _folderRepository.DeleteAsync(folder);

                return new Response<bool>(true);
            }
        }
    }
}
