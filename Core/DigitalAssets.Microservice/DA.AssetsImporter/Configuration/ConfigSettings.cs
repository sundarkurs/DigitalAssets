namespace DA.AssetsImporter.Configuration
{
    public class ConfigSettings : IConfigSettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }
        public AppSettings AppSettings { get; set; }
        public MailSettings MailSettings { get; set; }
        public StorageSettings Smtp { get; set; }
    }
}