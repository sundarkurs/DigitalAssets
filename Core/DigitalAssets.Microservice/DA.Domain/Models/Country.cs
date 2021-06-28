using System;
using System.Collections.Generic;

#nullable disable

namespace DA.Domain.Models
{
    public partial class Country
    {
        public Country()
        {
            AssetImages = new HashSet<AssetImage>();
            AssetMasters = new HashSet<AssetMaster>();
            AssetProductImages = new HashSet<AssetProductImage>();
        }

        public string Iso { get; set; }
        public string Name { get; set; }

        public virtual ICollection<AssetImage> AssetImages { get; set; }
        public virtual ICollection<AssetMaster> AssetMasters { get; set; }
        public virtual ICollection<AssetProductImage> AssetProductImages { get; set; }
    }
}
