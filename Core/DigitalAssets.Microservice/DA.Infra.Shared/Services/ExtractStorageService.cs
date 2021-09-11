using DA.Application.Interfaces.Services;
using DA.Application.Models.Extract;
using DA.Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

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

        public async Task<XmlDocument> GetCatalogAsync()
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.ExtractFolder, "BLACKANT.xml");
            if (await _blobStorageService.ExistsAsync(filePath))
            {
                var data = await _blobStorageService.GetAsync(filePath);

                XmlDocument doc = new XmlDocument();
                string xml = Encoding.UTF8.GetString(data);
                doc.LoadXml(xml);

                XmlSerializer xmlSerializer = new XmlSerializer(typeof(Catalog));

                using (Stream sr = new MemoryStream(data))
                {
                    var aa = (Catalog)xmlSerializer.Deserialize(sr);
                }

                return doc;
            }
            return null;
        }
    }
}
