using System;
using System.Collections.Generic;
using System.Text;

namespace DA.Application.DTO.Asset
{
    public class AssetRequestBase
    {
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public Guid FolderId { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
    }
}
