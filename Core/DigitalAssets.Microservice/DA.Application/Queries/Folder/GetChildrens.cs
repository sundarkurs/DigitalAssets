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
    public class GetChildrens
    {
        public class Query : IRequest<Response<IEnumerable<FolderDto>>>
        {
            public Guid Id { get; set; }
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
                Expression<Func<Domain.Models.Folder, bool>> expression = x => x.ParentId == request.Id;
                var folders = _folderRepository.GetObjectsQueryable(expression).ToList();

                var assetTypesResponse = _mapper.Map<IEnumerable<FolderDto>>(folders);
                return new Response<IEnumerable<FolderDto>>(assetTypesResponse);
            }
        }
    }
}
