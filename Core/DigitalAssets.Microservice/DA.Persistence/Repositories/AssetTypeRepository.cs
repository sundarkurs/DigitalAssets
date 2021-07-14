using DA.Application.Interfaces.Repositories;
using DA.Domain.Models;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DA.Persistence.Repositories
{
    public class AssetTypeRepository : BaseRepository<AssetType>, IAssetTypeRepository
    {
        private readonly DbSet<AssetType> _assetTypes;

        public AssetTypeRepository(DigitalAssetsContext dbContext) : base(dbContext)
        {
            _assetTypes = dbContext.Set<AssetType>();
        }

        public Task<bool> IsCodeUniqueAsync(string code)
        {
            return _assetTypes.AllAsync(p => p.Code != code);
        }
    }
}
