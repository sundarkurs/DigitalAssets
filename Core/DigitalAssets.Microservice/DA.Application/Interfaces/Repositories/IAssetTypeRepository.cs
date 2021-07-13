using DA.Domain.Models;
using System.Threading.Tasks;

namespace DA.Application.Interfaces.Repositories
{
    public interface IAssetTypeRepository : IBaseRepository<AssetType>
    {
        Task<bool> IsCodeUniqueAsync(string code);
    }
}
