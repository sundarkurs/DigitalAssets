using System.Threading.Tasks;

namespace DA.Application.Interfaces.Services
{
    public interface IExtractStorageService
    {
        Task<byte[]> GetAsync(string fileName);

        Task<bool> ExistsAsync(string fileName);

        Task<bool> SaveAsync(byte[] data, string fileName);
    }
}
