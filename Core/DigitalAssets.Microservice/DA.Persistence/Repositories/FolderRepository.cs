using DA.Application.Interfaces.Repositories;
using DA.Domain.Models;
using DA.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DA.Persistence.Repositories
{
    public class FolderRepository : BaseRepository<Folder>, IFolderRepository
    {
        private readonly DbSet<Folder> _folders;

        public FolderRepository(DigitalAssetsContext dbContext) : base(dbContext)
        {
            _folders = dbContext.Set<Folder>();
        }

        public async Task<List<Folder>> GetChildrensAsync(Guid root)
        {
            return await _folders.Include(m => m.InverseParent).Where(m => m.Id == root).ToListAsync();
        }
    }

}
