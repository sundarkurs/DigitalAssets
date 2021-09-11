using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace DA.Application.Models.Extract
{
    [XmlRoot(ElementName = "Catalog")]
    public class Catalog
    {
        public Catalog()
        {
            Families = new List<Family>();
        }

        [XmlElement(ElementName = "Families")]
        public List<Family> Families { get; set; }

        public Family this[string name]
        {
            get { return Families.FirstOrDefault(s => string.Equals(s.Name, name, StringComparison.OrdinalIgnoreCase)); }
        }

        [XmlElement(ElementName = "ProjId")]
        public string ProjectId { get; set; }

        [XmlElement(ElementName = "Name")]
        public string Name { get; set; }

        [XmlElement(ElementName = "Description")]
        public string Description { get; set; }

    }
}
