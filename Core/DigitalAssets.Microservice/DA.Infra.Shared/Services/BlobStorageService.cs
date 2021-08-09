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

        public async Task<bool> UploadAsync(byte[] content, string blobName)
        {
            try
            {
                var stream = new MemoryStream(content);
                var blobClient = _blobContainer.GetBlobClient(blobName);
                var info = await blobClient.UploadAsync(stream);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return false;
        }

        public async Task<bool> DirectoryExistsAsync(string path)
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

            return directoryNames.Contains(path);

        }

        public async Task<bool> FileExistsAsync(string blobName)
        {
            var blob = _blobContainer.GetBlobClient(blobName);

            return await blob.ExistsAsync();
        }

        public async Task<string> GetAsync(string blobName)
        {
            try
            {
                var blob = _blobContainer.GetBlobClient(blobName);

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
                _logger.LogError(ex.Message);
                return null;
            }
            return null;
        }
    }
}
