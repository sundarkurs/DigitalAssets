
using System;

namespace DA.Application.DTO.AssetType
{
    public class AssetTypeRequest
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public Guid RootFolderId { get; set; }
    }
}
