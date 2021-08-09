using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using DA.Application.Interfaces.Services;
using DA.Domain.Settings;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace DA.Infra.Shared.Services
{
    public class BlobStorageService : IBlobStorageService
    {
        public StorageSettings _storageSettings { get; }
        public ILogger<EmailService> _logger { get; }

        BlobContainerClient _blobContainer;

        public BlobStorageService(IOptions<StorageSettings> storageSettings, ILogger<EmailService> logger)
        {
            _storageSettings = storageSettings.Value;
            _logger = logger;

            _blobContainer = new BlobContainerClient(_storageSettings.Connection, _storageSettings.Container);
            _blobContainer.CreateIfNotExists();
        }

        public async Task<bool> CreateOrUpdate(byte[] data, string name)
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, name);
            var stream = new MemoryStream(data);
            var blobClient = _blobContainer.GetBlobClient(filePath);
            var info = await blobClient.UploadAsync(stream);
            return true;
        }

        public async Task<bool> DirectoryExistsAsync(string name)
        {
            Queue<string> prefixes = new Queue<string>();
            prefixes.Enqueue("");
            List<string> directoryNames = new List<string>();
            do
            {
                string prefix = prefixes.Dequeue();
                await foreach (BlobHierarchyItem blobHierarchyItem in _blobContainer.GetBlobsByHierarchyAsync(prefix: prefix, delimiter: "/"))
                {
                    if (blobHierarchyItem.IsPrefix)
                    {
                        directoryNames.Add(blobHierarchyItem.Prefix);
                        prefixes.Enqueue(blobHierarchyItem.Prefix);
                    }
                }
            } while (prefixes.Count > 0);

            return directoryNames.Contains(name);

        }

        public async Task<bool> FileExists(string name)
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, name);

            var blob = _blobContainer.GetBlobClient(filePath);

            return await blob.ExistsAsync();
        }

        public async Task<string> Get(string name)
        {
            try
            {
                var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, name);

                var blob = _blobContainer.GetBlobClient(filePath);

                if (blob.Exists())
                {
                    using (var stream = new MemoryStream())
                    {
                        var mm = await blob.DownloadContentAsync();
                        return Encoding.UTF8.GetString(stream.ToArray());
                    }
                }

            }
            catch (Exception ex)
            {
                return null;
            }
            return null;
        }
    }
}
