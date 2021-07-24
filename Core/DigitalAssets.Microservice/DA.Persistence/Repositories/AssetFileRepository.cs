using DA.Application.Interfaces.Repositories;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DA.Persistence.Repositories
{
    public class AssetFileRepository<T> : BaseRepository<T>, IAssetFileRepository<T> where T : class
    {
        private readonly DbSet<T> _assets;

        public AssetFileRepository(DigitalAssetsContext dbContext) : base(dbContext)
        {
            _assets = dbContext.Set<T>();
        }
    }
}
