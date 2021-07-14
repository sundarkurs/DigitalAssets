using System;

namespace DA.Application.DTO.AssetImage
{
    public class AssetImageRequest
    {
        public string Name { get; set; }
        public string Abstract { get; set; }
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public Guid FolderId { get; set; }
    }
}
