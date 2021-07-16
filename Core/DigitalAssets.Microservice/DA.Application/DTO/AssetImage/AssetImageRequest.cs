using DA.Application.DTO.Asset;
using System;

namespace DA.Application.DTO.AssetImage
{
    public class AssetImageRequest : AssetRequestBase
    {
        public string Name { get; set; }
        public string Abstract { get; set; }
    }
}
