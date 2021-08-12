namespace DA.AssetsImporter.Configuration
{
    public class MailSettings : IMailSettings
    {
        public string EmailFrom { get; set; }
        public string SmtpHost { get; set; }
        public string SmtpPort { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPass { get; set; }
        public string DisplayName { get; set; }
    }
}