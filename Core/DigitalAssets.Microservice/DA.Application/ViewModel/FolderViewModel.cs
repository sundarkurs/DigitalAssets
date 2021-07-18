using DA.Application.DTO.Folder;
using System.Collections.Generic;

namespace DA.Application.ViewModel
{
    public class FolderViewModel
    {
        public FolderDto Folder { get; set; }
        public FolderDto Parent { get; set; }
        public IEnumerable<FolderDto> Childrens { get; set; }
    }
}
