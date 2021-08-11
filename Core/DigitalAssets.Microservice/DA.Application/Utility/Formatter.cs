using DA.Application.Models;
using System;

namespace DA.Application.Utility
{
    public class Formatter
    {
        public static Transformation GetTransformationModel(string transformation)
        {
            if (string.IsNullOrEmpty(transformation))
            {
                return null;
            }

            Transformation response = new Transformation();

            try
            {
                var criteria = transformation.Split(';');


                foreach (var prop in criteria)
                {
                    var attribute = prop.Split(':');
                    var field = attribute[0];
                    var value = attribute[1];

                    response.Crop = field.ToLower() == "crop" ? (value == "true" ? true : false) : response.Crop;
                    response.Resize = field.ToLower() == "resize" ? (value == "true" ? true : false) : response.Resize;
                    response.Height = field.ToLower() == "height" ? Convert.ToInt32(value) : response.Height;
                    response.Width = field.ToLower() == "width" ? Convert.ToInt32(value) : response.Width;

                    if (field.ToLower() == "thumbnail")
                    {
                        response.Thumbnail = true;
                        var dimension = GetThumbnailSize(ParseEnum<Thumbnail>(value));
                        response.Height = dimension.Item1;
                        response.Width = dimension.Item2;
                    }
                }
            }
            catch (Exception ex) { }


            return response;
        }

        /// <summary>
        /// Returns <height, width>
        /// </summary>
        /// <param name="thumbnail"></param>
        /// <returns>Returns <height, width> </returns>
        public static Tuple<int, int> GetThumbnailSize(Thumbnail thumbnail)
        {
            switch (thumbnail)
            {
                case Thumbnail.XSmall:
                    return new Tuple<int, int>(40, 40);
                case Thumbnail.Small:
                    return new Tuple<int, int>(75, 75);
                case Thumbnail.Medium:
                    return new Tuple<int, int>(128, 128);
                case Thumbnail.Large:
                    return new Tuple<int, int>(192, 192);
                case Thumbnail.XLarge:
                    return new Tuple<int, int>(240, 240);
            }
            return null;
        }

        public static T ParseEnum<T>(string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

    }
}
