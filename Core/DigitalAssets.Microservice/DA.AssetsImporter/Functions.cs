using DA.AssetsImporter.Interfaces;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace DA.AssetsImporter
{
    public class Functions
    {
        private readonly ILogger<Functions> _logger;
        private readonly IAssetsImporter _assetsImporter;

        public Functions(ILogger<Functions> logger, IAssetsImporter assetsImporter)
        {
            _logger = logger;
            _assetsImporter = assetsImporter;
        }

        [NoAutomaticTrigger]
        public async Task Run(TextWriter writer, CancellationToken cancellationToken)
        {
            writer.WriteLine($"{nameof(Run)} started at {DateTime.UtcNow}");
            await _assetsImporter.ProcessAsync();
        }
    }
}
