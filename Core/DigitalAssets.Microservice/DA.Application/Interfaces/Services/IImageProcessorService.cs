
namespace DA.Application.Interfaces.Services
{
    public interface IImageProcessorService
    {
        byte[] Crop(byte[] imageBytes, int width, int height, string imageType);
        byte[] Resize(byte[] imageBytes, int width, int height, string imageType);
        byte[] Avatar(string firstName, string lastName, int width, int height, string bgColour);

    }
}
