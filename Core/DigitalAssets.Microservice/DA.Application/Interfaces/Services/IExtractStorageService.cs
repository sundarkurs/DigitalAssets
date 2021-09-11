using System.Threading.Tasks;
using System.Xml;

namespace DA.Application.Interfaces.Services
{
    public interface IExtractStorageService
    {
        Task<bool> IsExtractReadyAsync();
        Task<bool> StartImportAsync();
        Task<bool> EndImportAsync();
        Task<XmlDocument> GetCatalogAsync();
    }
}
