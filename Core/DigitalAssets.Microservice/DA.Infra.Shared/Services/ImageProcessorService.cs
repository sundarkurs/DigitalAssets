using DA.Application.Interfaces.Services;
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO;

namespace DA.Infra.Shared.Services
{
    public class ImageProcessorService : IImageProcessorService
    {
        public byte[] Crop(byte[] imageBytes, int width, int height, string imageType)
        {
            if (imageType == "image/svg+xml" || imageType == "application/octet-stream")
                return imageBytes;

            using (MemoryStream imageMemStream = new MemoryStream(imageBytes))
            {
                Image fullsizeImage = Image.FromStream(imageMemStream);
                //Calculate Ratio
                if (width == 0)
                {
                    var ratio = (float)fullsizeImage.Height / height;
                    width = (int)(fullsizeImage.Width / ratio);
                }

                if (height == 0)
                {
                    var ratio = (float)fullsizeImage.Width / width;
                    height = (int)(fullsizeImage.Height / ratio);
                }

                //Rescale and Crop
                using (fullsizeImage)
                {
                    double xRatio = (double)fullsizeImage.Width / width;
                    double yRatio = (double)fullsizeImage.Height / height;
                    double ratio = Math.Min(xRatio, yRatio);
                    int nnx = (int)Math.Ceiling(fullsizeImage.Width / ratio);
                    int nny = (int)Math.Ceiling(fullsizeImage.Height / ratio);
                    //rescale
                    Bitmap rescaleImage = new Bitmap(nnx, nny);
                    using (Graphics g = Graphics.FromImage(rescaleImage))
                    {
                        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        g.DrawImage(fullsizeImage, 0, 0, nnx, nny);

                        //Crop
                        var x = (nnx - width) / 2;
                        var y = (nny - height) / 2;

                        Rectangle crop = new Rectangle(x, y, width, height);

                        // Here we capture another resource.
                        var croppedImage = rescaleImage.Clone(crop, rescaleImage.PixelFormat);

                        using (MemoryStream resultImageMemStream = new MemoryStream())
                        {
                            croppedImage.Save(resultImageMemStream, GetImageType(imageType));
                            return resultImageMemStream.ToArray();
                        }
                    }
                }
            }
        }

        public byte[] Resize(byte[] imageBytes, int width, int height, string imageType)
        {
            if (imageType == "image/svg+xml" || imageType == "application/octet-stream")
                return imageBytes;

            using (MemoryStream imageMemStream = new MemoryStream(imageBytes))
            {


                Image fullsizeImage = Image.FromStream(imageMemStream);
                //Calculate Ratio
                if (width == 0)
                {
                    var ratio = (float)fullsizeImage.Height / height;
                    width = (int)(fullsizeImage.Width / ratio);
                }

                if (height == 0)
                {
                    var ratio = (float)fullsizeImage.Width / width;
                    height = (int)(fullsizeImage.Height / ratio);
                }
                using (fullsizeImage)
                {
                    int nnx = width;
                    int nny = height;
                    //rescale
                    Bitmap rescaleImage = new Bitmap(width, height);
                    using (Graphics g = Graphics.FromImage(rescaleImage))
                    {
                        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        g.DrawImage(fullsizeImage, 0, 0, width, height);

                        Rectangle crop = new Rectangle(0, 0, width, height);

                        // Here we capture another resource.
                        var croppedImage = rescaleImage.Clone(crop, rescaleImage.PixelFormat);

                        using (MemoryStream resultImageMemStream = new MemoryStream())
                        {
                            croppedImage.Save(resultImageMemStream, GetImageType(imageType));
                            return resultImageMemStream.ToArray();
                        }
                    }
                }
            }
        }

        public byte[] Avatar(string firstName, string lastName, int width, int height, string bgColour)
        {

            var avatarString = string.Format("{0}{1}", firstName[0], lastName[0]).ToUpper();
            width = width == 0 ? 640 : width;
            height = height == 0 ? 480 : height;
            var bmp = new Bitmap(width, height);
            var sf = new StringFormat();
            sf.Alignment = StringAlignment.Center;
            sf.LineAlignment = StringAlignment.Center;
            var fontSize = Math.Min(width / 2, height / 2);
            var font = new Font("Arial", (float)fontSize, FontStyle.Bold, GraphicsUnit.Pixel);
            var graphics = Graphics.FromImage(bmp);

            graphics.Clear((Color)new ColorConverter().ConvertFromString(bgColour));
            graphics.SmoothingMode = SmoothingMode.AntiAlias;
            graphics.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
            graphics.DrawString(avatarString, font, new SolidBrush(Color.WhiteSmoke),
                new RectangleF(0, 0, width, height), sf);

            graphics.Flush();

            var imageMemStream = new MemoryStream();
            bmp.Save(imageMemStream, ImageFormat.Png);

            return imageMemStream.ToArray();
        }

        private ImageFormat GetImageType(string imageType)
        {
            switch (imageType)
            {
                case "image/jpeg":
                case "image/jpg":
                    return ImageFormat.Jpeg;
                case "image/png":
                    return ImageFormat.Png;
                case "image/tif":
                case "image/tiff":
                    return ImageFormat.Tiff;
                case "image/gif":
                    return ImageFormat.Gif;
                default:
                    throw new InvalidDataException("Invalid Image Type!");

            }
        }

    }
}
