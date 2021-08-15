using DA.Application.Interfaces.Services;
using DA.Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace DA.Infra.Shared.Services
{
    public class ExtractStorageService : IExtractStorageService
    {
        public StorageSettings _storageSettings { get; }
        public ILogger<ExtractStorageService> _logger { get; }

        IBlobStorageService _blobStorageService;

        public ExtractStorageService(IOptions<StorageSettings> storageSettings, ILogger<ExtractStorageService> logger,
            IBlobStorageService blobStorageService)
        {
            _blobStorageService = blobStorageService;
            _storageSettings = storageSettings.Value;
            _logger = logger;
        }


        public async Task<bool> IsExtractReadyAsync()
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.ExtractFolder, "DONE.lck");
            var fileExist = await _blobStorageService.ExistsAsync(filePath);
            return fileExist;
        }

        public async Task<bool> StartImportAsync()
        {
            try
            {
                var lockImportDone = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.ExtractFolder, "IMP_DONE.lck");

                if (await _blobStorageService.ExistsAsync(lockImportDone))
                {
                    await _blobStorageService.DeleteAsync(lockImportDone);
                }

                var lockImportInProgress = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.ExtractFolder, "IMP_INPROGRESS.lck");
                return await _blobStorageService.UploadAsync("", lockImportInProgress);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return false;
        }

        public async Task<bool> EndImportAsync()
        {
            try
            {
                var lockImportInProgress = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.ExtractFolder, "IMP_INPROGRESS.lck");
                if (await _blobStorageService.ExistsAsync(lockImportInProgress))
                {
                    await _blobStorageService.DeleteAsync(lockImportInProgress);
                }

                var lockImportDone = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.ExtractFolder, "IMP_DONE.lck");
                return await _blobStorageService.UploadAsync("", lockImportDone);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return false;
        }
    }
}
