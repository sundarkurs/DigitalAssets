using DA.Application.Interfaces.Repositories;
using DA.Domain.Models;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DA.Persistence.Repositories
{
    public class AssetRepository : BaseRepository<AssetProductImage>, IAssetRepository
    {
        private readonly DbSet<AssetProductImage> _asset;

        public AssetRepository(DigitalAssetsContext dbContext) : base(dbContext)
        {
            _asset = dbContext.Set<AssetProductImage>();
        }
    }
}
