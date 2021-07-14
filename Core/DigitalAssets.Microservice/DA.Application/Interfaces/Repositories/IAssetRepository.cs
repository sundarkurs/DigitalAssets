using DA.Domain.Models;
using System.Threading.Tasks;

namespace DA.Application.Interfaces.Repositories
{
    public interface IAssetRepository<T> : IBaseRepository<T> where T : class
    {
    }
}
