namespace DA.AssetsImporter.Configuration
{
    public interface IStorageSettings
    {
        string Connection { get; set; }
        string Container { get; set; }
        string FilesFolder { get; set; }
        string RootFolder { get; set; }
    }
}