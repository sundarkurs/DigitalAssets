using AutoMapper;
using DA.Application.DTO.Folder;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace DA.Application.Queries.Folder
{
    public class GetFolder
    {
        public class Query : IRequest<Response<FolderDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<FolderDto>>
        {
            private readonly IFolderRepository _folderRepository;
            private readonly IMapper _mapper;

            public Handler(IFolderRepository folderRepository, IMapper mapper)
            {
                _folderRepository = folderRepository;
                _mapper = mapper;
            }

            public async Task<Response<FolderDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Expression<Func<Domain.Models.Folder, bool>> expression = x => x.ParentId == request.ParentId;
                //var folders = _folderRepository.GetObjectsQueryable(expression).ToList();

                var folder = await _folderRepository.GetByIdAsync(request.Id);

                if (folder == null)
                {
                    throw new ApiException($"Folder not found.");
                }

                var folderResponse = _mapper.Map<FolderDto>(folder);

                return new Response<FolderDto>(folderResponse);
            }
        }
    }
}
