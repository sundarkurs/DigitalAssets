namespace DA.AssetsImporter.Configuration
{
    public interface IMailSettings
    {
        string DisplayName { get; set; }
        string EmailFrom { get; set; }
        string SmtpHost { get; set; }
        string SmtpPass { get; set; }
        string SmtpPort { get; set; }
        string SmtpUser { get; set; }
    }
}