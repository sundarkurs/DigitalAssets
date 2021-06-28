using System;
using System.Collections.Generic;

#nullable disable

namespace DA.Domain.Models
{
    public partial class AssetProductImageFile
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int? Size { get; set; }
        public string Version { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
        public bool? IsDefault { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public Guid AssetId { get; set; }

        public virtual AssetProductImage Asset { get; set; }
    }
}
