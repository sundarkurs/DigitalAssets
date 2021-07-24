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
            // Database context
            services.AddDbContext<DigitalAssetsContext>(options =>
               options.UseSqlServer(
                   configuration.GetConnectionString("DefaultConnection"),
                   b => b.MigrationsAssembly(typeof(DigitalAssetsContext).Assembly.FullName)));

            // Repositories
            services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddTransient<IAssetTypeRepository, AssetTypeRepository>();
            services.AddTransient<IFolderRepository, FolderRepository>();
            services.AddTransient<IAssetRepository<Domain.Models.AssetProductImage>, AssetRepository<Domain.Models.AssetProductImage>>();
            services.AddTransient<IAssetRepository<Domain.Models.AssetImage>, AssetRepository<Domain.Models.AssetImage>>();
            services.AddTransient<IAssetFileRepository<Domain.Models.AssetImageFile>, AssetFileRepository<Domain.Models.AssetImageFile>>();
            services.AddTransient<IAssetFileRepository<Domain.Models.AssetProductImageFile>, AssetFileRepository<Domain.Models.AssetProductImageFile>>();
        }
    }
}
