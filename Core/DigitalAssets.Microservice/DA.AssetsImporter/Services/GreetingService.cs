using DA.AssetsImporter.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace DA.AssetsImporter.Services
{
    public class GreetingService : IGreetingService
    {
        private readonly ILogger<GreetingService> _logger;
        private readonly IConfiguration _config;
        private readonly IOptions<AppSettings> _appSettings;

        public GreetingService(ILogger<GreetingService> logger, IConfiguration config, IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _config = config;
            _appSettings = appSettings;
        }


        public async Task RunAsync()
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
