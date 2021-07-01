using System;
using System.Collections.Generic;

#nullable disable

namespace DA.Domain.Models
{
    public partial class AssetType
    {
        public AssetType()
        {
            AssetMasters = new HashSet<AssetMaster>();
            Folders = new HashSet<Folder>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        public virtual ICollection<AssetMaster> AssetMasters { get; set; }
        public virtual ICollection<Folder> Folders { get; set; }
    }
}
