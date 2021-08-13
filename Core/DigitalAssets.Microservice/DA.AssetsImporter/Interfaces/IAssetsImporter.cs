using System.Threading.Tasks;

namespace DA.AssetsImporter.Interfaces
{
    public interface IAssetsImporter
    {
        Task ProcessAsync();
    }
}
