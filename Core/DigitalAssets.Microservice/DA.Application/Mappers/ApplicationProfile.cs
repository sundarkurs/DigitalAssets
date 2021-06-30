using AutoMapper;
using DA.Application.DTO.AssetType;
using DA.Domain.Models;

namespace DA.Application.Mappers
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<AssetType, AssetTypeDto>().ReverseMap();
            CreateMap<AssetTypeRequest, AssetType>();
        }
    }
}
