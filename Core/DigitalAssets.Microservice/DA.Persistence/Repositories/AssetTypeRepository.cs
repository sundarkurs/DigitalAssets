using DA.Application.Interfaces.Repositories;
using DA.Domain.Models;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DA.Persistence.Repositories
{
    public class AssetTypeRepository : BaseRepository<AssetType>, IAssetTypeRepository
    {
        private readonly DbSet<AssetType> _assetTypes;

        public AssetTypeRepository(AppDataContext dbContext) : base(dbContext)
        {
            _assetTypes = dbContext.Set<AssetType>();
        }
    }
}
