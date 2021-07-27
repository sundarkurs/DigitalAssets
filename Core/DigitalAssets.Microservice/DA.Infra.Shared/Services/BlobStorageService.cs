using Azure.Storage.Blobs;
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
        BlobClient _blobClient;


        public BlobStorageService(IOptions<StorageSettings> storageSettings, ILogger<EmailService> logger)
        {
            _storageSettings = storageSettings.Value;
            _logger = logger;

            _blobContainer = new BlobContainerClient(_storageSettings.Connection, _storageSettings.Container);
            _blobContainer.CreateIfNotExists();
        }

        public bool CreateOrUpdate(byte[] data, string name)
        {
            Stream stream = new MemoryStream(data);
            BlobClient blob = _blobContainer.GetBlobClient(name);
            var res = blob.Upload(stream);
            return true;
        }

        public Task<bool> DirectoryExistsAsync(string name)
        {
            throw new NotImplementedException();
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
