using AutoMapper;
using DA.Application.DTO.AssetImage;
using DA.Application.DTO.AssetImageFile;
using DA.Application.DTO.AssetProductImage;
using DA.Application.DTO.AssetProductImageFile;
using DA.Application.DTO.AssetType;
using DA.Application.DTO.Folder;
using DA.Domain.Models;

namespace DA.Application.Mappers
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<AssetType, AssetTypeDto>().ReverseMap();
            CreateMap<AssetTypeRequest, AssetType>();

            CreateMap<AssetProductImage, AssetProductImageDto>().ReverseMap();
            CreateMap<AssetProductImageRequest, AssetProductImage>();

            CreateMap<AssetImage, AssetImageDto>().ReverseMap();
            CreateMap<AssetImageRequest, AssetImage>();

            CreateMap<Folder, FolderDto>().ReverseMap();
            CreateMap<FolderRequest, Folder>();

            CreateMap<AssetImageFile, AssetImageFileDto>().ReverseMap();
            CreateMap<AssetImageFileRequest, AssetImageFile>();

            CreateMap<AssetProductImageFile, AssetProductImageFileDto>().ReverseMap();
            CreateMap<AssetProductImageFileRequest, AssetProductImageFile>();
        }
    }
}
