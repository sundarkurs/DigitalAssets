using DA.Application.Interfaces.Services;
using DA.Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace DA.Infra.Shared.Services
{
    public class AssetFileService : IAssetFileService
    {
        public StorageSettings _storageSettings { get; }
        public ILogger<EmailService> _logger { get; }

        IBlobStorageService _blobStorageService;

        public AssetFileService(IOptions<StorageSettings> storageSettings, ILogger<EmailService> logger, IBlobStorageService blobStorageService)
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
            return await _blobStorageService.FileExistsAsync(filePath);
        }

        public async Task<bool> SaveAsync(byte[] data, string fileName)
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, fileName);
            return await _blobStorageService.UploadAsync(data, filePath);
        }
    }
}
