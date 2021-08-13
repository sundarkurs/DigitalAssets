using DA.AssetsImporter.Configuration;
using DA.AssetsImporter.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace DA.AssetsImporter.Services
{
    public class AssetsImporter : IAssetsImporter
    {
        private readonly ILogger<AssetsImporter> _logger;
        private readonly IOptions<AppSettings> _appSettings;

        public AssetsImporter(ILogger<AssetsImporter> logger, IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _appSettings = appSettings;
        }

        public async Task ProcessAsync()
        {
            _logger.LogInformation(_appSettings.Value.LoopTimes.ToString());
            for (int i = 0; i < _appSettings.Value.LoopTimes; i++)
            {
                _logger.LogInformation("Run number {runNumber}", i);
            }

            return;
        }
    }
}
