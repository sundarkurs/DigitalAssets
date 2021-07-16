using DA.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DA.Persistence.Contexts
{
    public partial class DigitalAssetsContext : DbContext
    {
        public DigitalAssetsContext()
        {
        }

        public DigitalAssetsContext(DbContextOptions<DigitalAssetsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AssetImage> AssetImages { get; set; }
        public virtual DbSet<AssetImageFile> AssetImageFiles { get; set; }
        public virtual DbSet<AssetMaster> AssetMasters { get; set; }
        public virtual DbSet<AssetProductImage> AssetProductImages { get; set; }
        public virtual DbSet<AssetProductImageFile> AssetProductImageFiles { get; set; }
        public virtual DbSet<AssetType> AssetTypes { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Folder> Folders { get; set; }
        public virtual DbSet<Language> Languages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=DigitalAssets;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AssetImage>(entity =>
            {
                entity.ToTable("AssetImage");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.CountryCode)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.LanguageCode)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedBy)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.CountryCodeNavigation)
                    .WithMany(p => p.AssetImages)
                    .HasForeignKey(d => d.CountryCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetImag__Count__4F9CCB9E");

                entity.HasOne(d => d.Folder)
                    .WithMany(p => p.AssetImages)
                    .HasForeignKey(d => d.FolderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetImag__Folde__51851410");

                entity.HasOne(d => d.LanguageCodeNavigation)
                    .WithMany(p => p.AssetImages)
                    .HasForeignKey(d => d.LanguageCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetImag__Langu__5090EFD7");
            });

            modelBuilder.Entity<AssetImageFile>(entity =>
            {
                entity.ToTable("AssetImageFile");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedBy)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.Property(e => e.Version)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetImageFiles)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetImag__Asset__5555A4F4");
            });

            modelBuilder.Entity<AssetMaster>(entity =>
            {
                entity.ToTable("AssetMaster");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CountryCode)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.LanguageCode)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Metadata).IsRequired();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PropertyMetadata).IsRequired();

                entity.Property(e => e.UpdatedBy)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.AssetType)
                    .WithMany(p => p.AssetMasters)
                    .HasForeignKey(d => d.AssetTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetMast__Asset__5832119F");

                entity.HasOne(d => d.CountryCodeNavigation)
                    .WithMany(p => p.AssetMasters)
                    .HasForeignKey(d => d.CountryCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetMast__Count__592635D8");

                entity.HasOne(d => d.LanguageCodeNavigation)
                    .WithMany(p => p.AssetMasters)
                    .HasForeignKey(d => d.LanguageCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetMast__Langu__5A1A5A11");
            });

            modelBuilder.Entity<AssetProductImage>(entity =>
            {
                entity.ToTable("AssetProductImage");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.CountryCode)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.LanguageCode)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Product)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Sku)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("SKU")
                    .IsFixedLength(true);

                entity.Property(e => e.UpdatedBy)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.CountryCodeNavigation)
                    .WithMany(p => p.AssetProductImages)
                    .HasForeignKey(d => d.CountryCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetProd__Count__46136164");

                entity.HasOne(d => d.Folder)
                    .WithMany(p => p.AssetProductImages)
                    .HasForeignKey(d => d.FolderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetProd__Folde__47FBA9D6");

                entity.HasOne(d => d.LanguageCodeNavigation)
                    .WithMany(p => p.AssetProductImages)
                    .HasForeignKey(d => d.LanguageCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetProd__Langu__4707859D");
            });

            modelBuilder.Entity<AssetProductImageFile>(entity =>
            {
                entity.ToTable("AssetProductImageFile");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedBy)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.Property(e => e.Version)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Asset)
                    .WithMany(p => p.AssetProductImageFiles)
                    .HasForeignKey(d => d.AssetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AssetProd__Asset__4BCC3ABA");
            });

            modelBuilder.Entity<AssetType>(entity =>
            {
                entity.ToTable("AssetType");

                entity.HasIndex(e => e.Code, "UQ__AssetTyp__A25C5AA72BCF3794")
                    .IsUnique();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.HasKey(e => e.Iso)
                    .HasName("PK__Country__C4926E1A5AEB959B");

                entity.ToTable("Country");

                entity.Property(e => e.Iso)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Folder>(entity =>
            {
                entity.ToTable("Folder");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedBy)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.HasOne(d => d.AssetTypeNavigation)
                    .WithMany(p => p.Folders)
                    .HasForeignKey(d => d.AssetType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Folder__AssetTyp__4242D080");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK__Folder__ParentId__414EAC47");
            });

            modelBuilder.Entity<Language>(entity =>
            {
                entity.HasKey(e => e.Iso)
                    .HasName("PK__Language__C4926E1AD8D4EFFD");

                entity.ToTable("Language");

                entity.Property(e => e.Iso)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
