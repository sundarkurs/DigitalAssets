using System.Xml.Serialization;

namespace DA.Application.Models.Extract
{
    public class Product
    {
        [XmlElement(ElementName = "ProjId")]
        public string ProjectId { get; set; }

        [XmlElement(ElementName = "Name")]
        public string Name { get; set; }

        [XmlElement(ElementName = "Description")]
        public string Description { get; set; }

        [XmlElement(ElementName = "Category")]
        public string Category { get; set; }

        [XmlElement(ElementName = "Platform")]
        public string Platform { get; set; }

        [XmlElement(ElementName = "Segment")]
        public string Segment { get; set; }
    }
}