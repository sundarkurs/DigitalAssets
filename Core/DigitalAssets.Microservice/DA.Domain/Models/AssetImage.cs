using System;
using System.Collections.Generic;

#nullable disable

namespace DA.Domain.Models
{
    public partial class AssetImage
    {
        public AssetImage()
        {
            AssetImageFiles = new HashSet<AssetImageFile>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Abstract { get; set; }
        public string CountryCode { get; set; }
        public string LanguageCode { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }

        public virtual Country CountryCodeNavigation { get; set; }
        public virtual Language LanguageCodeNavigation { get; set; }
        public virtual ICollection<AssetImageFile> AssetImageFiles { get; set; }
    }
}
