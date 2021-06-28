using System;
using System.Collections.Generic;

#nullable disable

namespace DA.Domain.Models
{
    public partial class Folder
    {
        public Folder()
        {
            InverseParent = new HashSet<Folder>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public int AssetType { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }

        public virtual AssetType AssetTypeNavigation { get; set; }
        public virtual Folder Parent { get; set; }
        public virtual ICollection<Folder> InverseParent { get; set; }
    }
}
