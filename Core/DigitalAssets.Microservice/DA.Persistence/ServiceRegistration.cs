using DA.Application.Interfaces.Repositories;
using DA.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DA.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(options =>
               options.UseSqlServer(
                   configuration.GetConnectionString("DefaultConnection"),
                   b => b.MigrationsAssembly(typeof(DataContext).Assembly.FullName)));

            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IAssetTypeRepository, AssetTypeRepository>();
        }
    }
}
