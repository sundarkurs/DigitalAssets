using DA.Application.Interfaces.Services;
using DA.Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace DA.Infra.Shared.Services
{
    public class AssetFileStorageService : IAssetFileStorageService
    {
        public StorageSettings _storageSettings { get; }
        public ILogger<AssetFileStorageService> _logger { get; }

        IBlobStorageService _blobStorageService;

        public AssetFileStorageService(IOptions<StorageSettings> storageSettings, ILogger<AssetFileStorageService> logger,
            IBlobStorageService blobStorageService)
        {
            _blobStorageService = blobStorageService;
            _storageSettings = storageSettings.Value;
            _logger = logger;
        }

        public async Task<byte[]> GetAsync(string fileName)
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, fileName);
            return await _blobStorageService.GetAsync(filePath);
        }

        public async Task<bool> ExistsAsync(string fileName)
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, fileName);
            return await _blobStorageService.ExistsAsync(filePath);
        }

        public async Task<bool> SaveAsync(byte[] data, string fileName)
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, fileName);
            return await _blobStorageService.UploadAsync(data, filePath);
        }
    }
}
