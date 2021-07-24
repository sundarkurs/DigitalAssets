using System;

namespace DA.Application.DTO.AssetProductImageFile
{
    public class AssetProductImageFileDto
    {
        public Guid Id { get; set; }
        public Guid AssetId { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public Guid BlobId { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
        public int Size { get; set; }
        public bool? IsDefault { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
    }
}
