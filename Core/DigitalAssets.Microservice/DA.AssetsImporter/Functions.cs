using DA.AssetsImporter.Services;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DA.AssetsImporter
{
    public class Functions
    {
        private readonly ILogger<Functions> _logger;
        private readonly IGreetingService _greetingService;

        public Functions(ILogger<Functions> logger, IGreetingService greetingService)
        {
            _logger = logger;
            _greetingService = greetingService;
        }

        [NoAutomaticTrigger]
        public async Task Run(TextWriter writer, CancellationToken cancellationToken)
        {
            writer.WriteLine($"{nameof(Run)} started at {DateTime.UtcNow}");
            await _greetingService.RunAsync();
        }
    }
}
