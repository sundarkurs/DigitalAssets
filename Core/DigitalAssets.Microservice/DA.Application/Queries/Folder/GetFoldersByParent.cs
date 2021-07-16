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
    public class GetFoldersByParent
    {
        public class Query : IRequest<Response<IEnumerable<FolderDto>>>
        {
            public Guid Root { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<IEnumerable<FolderDto>>>
        {
            private readonly IFolderRepository _folderRepository;
            private readonly IMapper _mapper;

            public Handler(IFolderRepository folderRepository, IMapper mapper)
            {
                _folderRepository = folderRepository;
                _mapper = mapper;
            }

            public async Task<Response<IEnumerable<FolderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Expression<Func<Domain.Models.Folder, bool>> expression = x => x.Id == request.Root;
                //var folders = _folderRepository.GetObjectsQueryable(expression).ToList();

                var folders = await _folderRepository.GetChildrensAsync(request.Root);

                var assetTypesResponse = _mapper.Map<IEnumerable<FolderDto>>(folders);
                return new Response<IEnumerable<FolderDto>>(assetTypesResponse);
            }
        }
    }
}
