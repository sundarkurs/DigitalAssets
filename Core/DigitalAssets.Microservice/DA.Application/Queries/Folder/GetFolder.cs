using AutoMapper;
using DA.Application.DTO.Folder;
using DA.Application.Exceptions;
using DA.Application.Interfaces.Repositories;
using DA.Application.ViewModel;
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
        public class Query : IRequest<Response<FolderViewModel>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<FolderViewModel>>
        {
            private readonly IFolderRepository _folderRepository;
            private readonly IMapper _mapper;

            public Handler(IFolderRepository folderRepository, IMapper mapper)
            {
                _folderRepository = folderRepository;
                _mapper = mapper;
            }

            public async Task<Response<FolderViewModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var folderEntity = await _folderRepository.GetByIdAsync(request.Id);

                if (folderEntity == null)
                {
                    throw new ApiException($"Folder not found.");
                }
                
                var folder = _mapper.Map<FolderDto>(folderEntity);

                var response = new FolderViewModel();
                response.Folder = folder;

                if (folder.ParentId != null)
                {
                    var parentEntity = await _folderRepository.GetByIdAsync((Guid)folder.ParentId);
                    var parent = _mapper.Map<FolderDto>(parentEntity);
                    response.Parent = parent;
                    
                }

                Expression<Func<Domain.Models.Folder, bool>> expression = x => x.ParentId == folder.Id;
                var childrenEntities = _folderRepository.GetObjectsQueryable(expression).ToList();
                var childrens = _mapper.Map<IEnumerable<FolderDto>>(childrenEntities);

                response.Childrens = childrens;

                return new Response<FolderViewModel>(response);
            }
        }
    }
}
