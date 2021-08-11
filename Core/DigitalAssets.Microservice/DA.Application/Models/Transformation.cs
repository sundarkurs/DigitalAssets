
namespace DA.Application.Models
{
    public class Transformation
    {
        public int Height { get; set; }
        public int Width { get; set; }
        public bool Crop { get; set; }
        public bool Resize { get; set; }
        public bool Thumbnail { get; set; }
    }
}
