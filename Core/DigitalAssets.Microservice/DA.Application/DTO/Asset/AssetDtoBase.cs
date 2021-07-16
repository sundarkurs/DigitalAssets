using System;

namespace DA.Application.DTO.Asset
{
    public class AssetDtoBase
    {
        public Guid Id { get; set; }
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public Guid FolderId { get; set; }
    }
}
