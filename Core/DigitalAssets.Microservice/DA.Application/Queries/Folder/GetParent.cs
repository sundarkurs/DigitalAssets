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
    public class GetParent
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
                var folder = await _folderRepository.GetByIdAsync(request.Id);

                if (folder.ParentId != null)
                {
                    var parent = await _folderRepository.GetByIdAsync((Guid)folder.ParentId);
                    var parentResponse = _mapper.Map<FolderDto>(parent);
                    return new Response<FolderDto>(parentResponse);
                }

                return new Response<FolderDto>(null);
            }
        }
    }
}
