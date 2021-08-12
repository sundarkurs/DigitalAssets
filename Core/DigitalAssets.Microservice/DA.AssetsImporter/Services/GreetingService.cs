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
        private readonly IOptions<ConfigSettings> _configSettings;

        public GreetingService(ILogger<GreetingService> logger, IConfiguration config, IOptions<ConfigSettings> configSettings)
        {
            _logger = logger;
            _config = config;
            _configSettings = configSettings;
        }


        public async Task RunAsync()
        {
            _logger.LogInformation(_configSettings.Value.AppSettings.LoopTimes.ToString());
            for (int i = 0; i < _configSettings.Value.AppSettings.LoopTimes; i++)
            {
                _logger.LogInformation("Run number {runNumber}", i);
            }

            return;
        }
    }
}
