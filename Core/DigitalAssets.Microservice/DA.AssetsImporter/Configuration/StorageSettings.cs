namespace DA.AssetsImporter.Configuration
{
    public class StorageSettings : IStorageSettings
    {
        public string Connection { get; set; }
        public string Container { get; set; }
        public string RootFolder { get; set; }
        public string FilesFolder { get; set; }
    }
}