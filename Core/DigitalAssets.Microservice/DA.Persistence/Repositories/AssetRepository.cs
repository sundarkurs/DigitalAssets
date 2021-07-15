using DA.Application.Interfaces.Repositories;
using DA.Domain.Models;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DA.Persistence.Repositories
{
    public class AssetRepository<T> : BaseRepository<T>, IAssetRepository<T> where T : class
    {
        private readonly DbSet<T> _assets;

        public AssetRepository(DigitalAssetsContext dbContext) : base(dbContext)
        {
            _assets = dbContext.Set<T>();
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await _assets.FindAsync(id);
        }
    }
}
