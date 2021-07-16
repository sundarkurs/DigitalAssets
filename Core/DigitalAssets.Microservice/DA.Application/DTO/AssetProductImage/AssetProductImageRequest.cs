using DA.Application.DTO.Asset;
using System;

namespace DA.Application.DTO.AssetProductImage
{
    public class AssetProductImageRequest : AssetRequestBase
    {
        public string Name { get; set; }
        public string Sku { get; set; }
        public string Product { get; set; }
    }
}
