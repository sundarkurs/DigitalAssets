using DA.Application.Interfaces.Services;
using DA.Domain.Settings;
using DA.Infra.Shared.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DA.Infra.Shared
{
    public static class ServiceRegistration
    {
        public static void AddSharedInfrastructure(this IServiceCollection services, IConfiguration _config)
        {
            services.Configure<MailSettings>(_config.GetSection("MailSettings"));
            services.Configure<StorageSettings>(_config.GetSection("StorageSettings"));
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IBlobStorageService, BlobStorageService>();
            services.AddTransient<IAssetFileService, AssetFileService>();
        }
    }
}
