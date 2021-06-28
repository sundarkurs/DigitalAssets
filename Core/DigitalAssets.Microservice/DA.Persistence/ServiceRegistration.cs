using DA.Application.Interfaces.Repositories;
using DA.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace DA.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IAssetTypeRepository, AssetTypeRepository>();
        }
    }
}
