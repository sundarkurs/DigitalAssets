using DA.Application.Interfaces.Repositories;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DA.Persistence.Repositories
{
    public class AssetRepository<T> : BaseRepository<T>, IAssetRepository<T> where T : class
    {
        private readonly DbSet<T> _assets;

        public AssetRepository(DigitalAssetsContext dbContext) : base(dbContext)
        {
            _assets = dbContext.Set<T>();
        }
    }
}
