using System.Threading.Tasks;

namespace DA.Application.Interfaces.Services
{
    public interface IBlobStorageService
    {
        bool CreateOrUpdate(byte[] data, string name);

        Task<string> Get(string name);

        Task<bool> FileExists(string name);

        Task<bool> DirectoryExistsAsync(string name);

    }

}
