using System;

namespace DA.Application.DTO.Base
{
    public class AssetRequestBase
    {
        public string Name { get; set; }
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public Guid FolderId { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
    }
}
