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

        public bool CreateOrUpdate(byte[] data, string name)
        {
            var filePath = string.Format("{0}/{1}/{2}", _storageSettings.RootFolder, _storageSettings.FilesFolder, name);
            var stream = new MemoryStream(data);
            var blobClient = _blobContainer.GetBlobClient(filePath);
            blobClient.Upload(stream);
            return true;
        }

        public async Task<bool> DirectoryExistsAsync(string name)
        {
            //throw new NotImplementedException();

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

        public Task<bool> FileExists(string name)
        {
            throw new NotImplementedException();
        }

        public Task<string> Get(string name)
        {
            throw new NotImplementedException();
        }
    }
}
