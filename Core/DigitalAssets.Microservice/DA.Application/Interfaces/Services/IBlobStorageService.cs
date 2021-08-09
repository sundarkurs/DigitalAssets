using System.Threading.Tasks;

namespace DA.Application.Interfaces.Services
{
    public interface IBlobStorageService
    {
        Task<bool> UploadAsync(byte[] content, string blobName);

        Task<string> GetAsync(string blobName);

        Task<bool> FileExistsAsync(string blobName);

        Task<bool> DirectoryExistsAsync(string path);

    }

}
