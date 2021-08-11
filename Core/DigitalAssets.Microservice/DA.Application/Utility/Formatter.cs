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
                }
            }
            catch (Exception ex) { }


            return response;
        }
    }
}
