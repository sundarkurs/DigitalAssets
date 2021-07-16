using System;

namespace DA.Application.DTO.Folder
{
    public class FolderRequest
    {
        public string Name { get; set; }
        public Guid ParentId { get; set; }
        public int AssetType { get; set; }
    }
}
