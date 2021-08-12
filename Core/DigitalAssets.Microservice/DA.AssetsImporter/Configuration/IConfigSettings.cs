namespace DA.AssetsImporter.Configuration
{
    public interface IConfigSettings
    {
        ConnectionStrings ConnectionStrings { get; }
        AppSettings AppSettings { get; }
        MailSettings MailSettings { get; }
        StorageSettings Smtp { get; }
    }
}