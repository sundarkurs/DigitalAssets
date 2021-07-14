using System;
using System.Collections.Generic;

#nullable disable

namespace DA.Domain.Models
{
    public partial class AssetProductImage
    {
        public AssetProductImage()
        {
            AssetProductImageFiles = new HashSet<AssetProductImageFile>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Sku { get; set; }
        public string Product { get; set; }
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public Guid FolderId { get; set; }

        public virtual Country CountryCodeNavigation { get; set; }
        public virtual Folder Folder { get; set; }
        public virtual Language LanguageCodeNavigation { get; set; }
        public virtual ICollection<AssetProductImageFile> AssetProductImageFiles { get; set; }
    }
}
