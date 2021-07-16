using DA.Application.DTO.Base;

namespace DA.Application.DTO.AssetProductImage
{
    public class AssetProductImageRequest : AssetRequestBase
    {
        public string Sku { get; set; }
        public string Product { get; set; }
    }
}
