using System.Threading.Tasks;

namespace DA.Application.Interfaces.Services
{
    public interface IBlobStorageService
    {
        Task<bool> UploadAsync(byte[] content, string blobName);
        Task<bool> UploadAsync(string content, string blobName);
        Task<byte[]> GetAsync(string blobName);
        Task<bool> ExistsAsync(string blobName);
        Task<bool> DirectoryExistsAsync(string path);
        Task DeleteAsync(string blobName);
    }
}
