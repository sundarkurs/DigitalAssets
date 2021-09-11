using System.Collections.Generic;
using System.Xml.Serialization;

namespace DA.Application.Models.Extract
{
    public class Family
    {
        [XmlElement(ElementName = "ProjId")]
        public string ProjectId { get; set; }

        [XmlElement(ElementName = "Name")]
        public string Name { get; set; }

        [XmlElement(ElementName = "Description")]
        public string Description { get; set; }

        [XmlElement(ElementName = "Products/Product")]
        public List<Product> Products { get; set; }
    }
}