using AutoMapper;
using DA.Application.Interfaces.Repositories;
using DA.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static DA.Application.Queries.AssetTypes.List;

namespace DA.Application.Queries.AssetTypes
{
    public class List
    {
        public class Query : IRequest<List<AssetType>> { }

        public class Handler : IRequestHandler<Query, List<AssetType>>
        {
            private readonly IAssetTypeRepository _assetTypeRepository;
            private readonly IMapper _mapper;

            public Handler(IAssetTypeRepository assetTypeRepository, IMapper mapper)
            {
                _assetTypeRepository = assetTypeRepository;
                _mapper = mapper;
            }

            public async Task<List<AssetType>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _assetTypeRepository.GetAllAsync();

                return (List<AssetType>)activities;
            }
        }
    }
}
