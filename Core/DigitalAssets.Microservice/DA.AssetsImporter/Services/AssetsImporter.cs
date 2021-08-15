using DA.Application.Interfaces.Services;
using DA.AssetsImporter.Configuration;
using DA.AssetsImporter.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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

            var isExtractReady = await _extractStorageService.IsExtractReadyAsync();

            if (isExtractReady)
            {
                await _extractStorageService.StartImportAsync();

                await _extractStorageService.EndImportAsync();
            }

            return;
        }
    }
}
