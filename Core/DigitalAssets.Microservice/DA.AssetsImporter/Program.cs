using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.IO;

namespace DA.AssetsImporter
{
    class Program
    {
        static void Main(string[] args)
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

            var host = Host.CreateDefaultBuilder()
                .ConfigureServices((context, services) =>
                {
                    services.AddTransient<IGreetingService, GreetingService>();
                })
                .UseSerilog()
                .Build();


            var service = ActivatorUtilities.CreateInstance<GreetingService>(host.Services);

            service.Run();

            //var build = Host.CreateDefaultBuilder(args)

            //.UseEnvironment(environment)

            //.ConfigureWebJobs(b =>
            //{
            //    b.AddAzureStorageCoreServices()
            //     .AddAzureStorage()
            //     .AddTimers();
            //})

            //.ConfigureAppConfiguration((hostingContext, config) =>
            //{
            //    config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            //        .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
            //        .AddEnvironmentVariables();

            //    config.AddCommandLine(args);
            //})

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
