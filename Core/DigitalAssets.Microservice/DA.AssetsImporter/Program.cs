using DA.Application;
using DA.AssetsImporter.Configuration;
using DA.AssetsImporter.Extensions;
using DA.AssetsImporter.Services;
using DA.Infra.Shared;
using DA.Persistence;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.IO;
using System.Threading.Tasks;

namespace DA.AssetsImporter
{
    public class Program
    {
        public static IConfiguration Configuration;

        static async Task Main(string[] args)
        {

            var builder = new ConfigurationBuilder();
            BuildConfig(builder);

            // Configuring Serilog
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Build())
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            Log.Logger.Information("Application started");

            Configuration = builder.Build();

            var host = Host.CreateDefaultBuilder()
                .ConfigureWebJobs(b =>
                {
                    b.AddAzureStorageCoreServices()
                     .AddAzureStorage()
                     .AddTimers();
                })
                .ConfigureServices((context, services) =>
                {
                    services.AddServices();
                    services.AddConfigurations(context);

                    services.AddApplicationServices();
                    services.AddPersistenceServices(Configuration);
                    services.AddSharedInfrastructure(Configuration);
                })
                .UseSerilog()
                .Build();

            //var service = ActivatorUtilities.CreateInstance<GreetingService>(host.Services);
            //await service.RunAsync();

            using (host)
            {
                var jobHost = host.Services.GetService(typeof(IJobHost)) as JobHost;
                await host.StartAsync();
                await jobHost.CallAsync(nameof(Functions.RunAsync));
                await host.StopAsync();
            }
        }

        static void BuildConfig(IConfigurationBuilder builder)
        {
            var environment = Environment.GetEnvironmentVariable("ASSETS_ENVIRONMENT") ?? "Development";

            builder.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
        }
    }
}
