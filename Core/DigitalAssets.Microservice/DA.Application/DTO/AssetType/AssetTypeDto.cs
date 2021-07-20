using System;

namespace DA.Application.DTO.AssetType
{
    public class AssetTypeDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public bool Disabled { get; set; }
        public Guid RootFolderId { get; set; }
    }
}
