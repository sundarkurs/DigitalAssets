using DA.Application.Interfaces.Services;
using DA.Application.Models.Extract;
using DA.AssetsImporter.Configuration;
using DA.AssetsImporter.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.IO;
using System.Threading.Tasks;

namespace DA.AssetsImporter.Services
{
    public class AssetsImporter : IAssetsImporter
    {
        private readonly ILogger<AssetsImporter> _logger;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly IExtractStorageService _extractStorageService;

        public AssetsImporter(ILogger<AssetsImporter> logger, IOptions<AppSettings> appSettings, IExtractStorageService extractStorageService)
        {
            _logger = logger;
            _appSettings = appSettings;
            _extractStorageService = extractStorageService;
        }

        public async Task ProcessAsync()
        {
            _logger.LogInformation("Process started");

            var a = await _extractStorageService.GetCatalogAsync();

            return;

            var isExtractReady = await _extractStorageService.IsExtractReadyAsync();

            
            if (isExtractReady)
            {
                await _extractStorageService.StartImportAsync();

                var xmlDoc = await _extractStorageService.GetCatalogAsync();

                //System.Xml.Serialization.XmlSerializer ser = new System.Xml.Serialization.XmlSerializer(typeof(Catalog));

                //using (StreamReader sr = new StreamReader(filepath))
                //{
                //     (Catalog)ser.Deserialize(sr);
                //}

                await _extractStorageService.EndImportAsync();
            }

            return;
        }
    }
}
