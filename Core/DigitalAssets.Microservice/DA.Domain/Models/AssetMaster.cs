using System;
using System.Collections.Generic;

#nullable disable

namespace DA.Domain.Models
{
    public partial class AssetMaster
    {
        public long Id { get; set; }
        public Guid AssetId { get; set; }
        public int AssetTypeId { get; set; }
        public string Name { get; set; }
        public string Metadata { get; set; }
        public string PropertyMetadata { get; set; }
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }

        public virtual AssetType AssetType { get; set; }
        public virtual Country CountryCodeNavigation { get; set; }
        public virtual Language LanguageCodeNavigation { get; set; }
    }
}
