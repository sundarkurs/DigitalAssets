using System.Threading.Tasks;

namespace DA.Application.Interfaces.Services
{
    public interface IExtractStorageService
    {
        Task<bool> IsExtractReadyAsync();
        Task<bool> StartImportAsync();
        Task<bool> EndImportAsync();
    }
}
