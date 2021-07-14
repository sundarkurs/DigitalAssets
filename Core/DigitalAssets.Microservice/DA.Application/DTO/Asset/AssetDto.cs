using System;
using System.Collections.Generic;
using System.Text;

namespace DA.Application.DTO.Asset
{
    public class AssetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Sku { get; set; }
        public string Product { get; set; }
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public Guid FolderId { get; set; }
    }
}
