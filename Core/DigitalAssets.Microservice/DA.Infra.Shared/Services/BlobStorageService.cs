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
                var data = new MemoryStream(content);
                var blobClient = _blobContainer.GetBlobClient(blobName);
                var info = await blobClient.UploadAsync(data);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return false;
        }

        public async Task<bool> UploadAsync(string content, string blobName)
        {
            try
            {
                var data = new BinaryData(content);
                var blobClient = _blobContainer.GetBlobClient(blobName);
                var info = await blobClient.UploadAsync(data);
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
            try
            {
                var blob = _blobContainer.GetBlobClient(blobName);

                return await blob.ExistsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return false;
        }

        public async Task<byte[]> GetAsync(string blobName)
        {
            try
            {
                var blob = _blobContainer.GetBlobClient(blobName);

                if (blob.Exists())
                {
                    //var downloadResult = await blob.DownloadContentAsync();
                    //return downloadResult.GetRawResponse().Content.ToArray();

                    using (var memorystream = new MemoryStream())
                    {
                        await blob.DownloadToAsync(memorystream);
                        return memorystream.ToArray();
                    }
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
            }

            return null;
        }

        public async Task DeleteAsync(string blobName)
        {
            await _blobContainer.DeleteBlobAsync(blobName);
        }
    }
}
