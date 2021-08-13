using DA.AssetsImporter.Configuration;
using DA.AssetsImporter.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DA.AssetsImporter.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddTransient<IAssetsImporter, Services.AssetsImporter>();
        }

        public static void AddConfigurations(this IServiceCollection services, HostBuilderContext context)
        {
            services.Configure<AppSettings>(context.Configuration.GetSection("AppSettings"));
            services.Configure<ConnectionStrings>(context.Configuration.GetSection("ConnectionStrings"));
            services.Configure<MailSettings>(context.Configuration.GetSection("MailSettings"));
            services.Configure<StorageSettings>(context.Configuration.GetSection("StorageSettings"));
        }
    }
}
