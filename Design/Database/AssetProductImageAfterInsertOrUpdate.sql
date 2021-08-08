GO

DROP TRIGGER [dbo].[AssetProductImageAfterInsertOrUpdate]

GO

SET quoted_identifier ON

GO

CREATE TRIGGER [dbo].[AssetProductImageAfterInsertOrUpdate]
ON [dbo].[AssetProductImage]
AFTER INSERT, UPDATE
AS

	DECLARE @AssetId		UNIQUEIDENTIFIER,
			@Name			NameType,
			@SKU			CHAR(10),
			@Product		NameType,
			@CountryCode	IsoType ,
			@LanguageCode	IsoType ,
			@UpdatedOn		DATETIME ,
			@UpdatedBy		UsernameType,
			@Metadata		NVARCHAR(MAX),
			@PropertyMetadata	NVARCHAR(MAX),
			@AssetType		INT;

    SET @AssetType = 1;

    SELECT @AssetId = ins.id,
           @Name = ins.NAME,
		   @SKU = ins.SKU,
		   @Product = ins.Product,
		   @CountryCode = ins.CountryCode,
		   @LanguageCode = ins.LanguageCode,
           @UpdatedOn = ins.UpdatedOn,
           @UpdatedBy = ins.UpdatedBy
    FROM   inserted ins;

    SET @Metadata= @Name +	'{<Country:' + Isnull(@CountryCode, '') + '>}' +
							'{<Language:' + Isnull(@LanguageCode, '') + '>}';

    SET @PropertyMetadata=	'{<Image>} ' +
							'{<Name:' + @Name + '>} ' +
							'{<SKU:' + @SKU + '>} ' +
							'{<Product:' + @Product + '>} ' +
							'{<Country:' + Isnull(@CountryCode, '') + '>} ' +
							'{<Language:' + Isnull(@LanguageCode, '') + '>}';

    IF EXISTS(SELECT 1 FROM dbo.assetmaster WITH(nolock) WHERE AssetId = @AssetId AND AssetTypeId = @AssetType)
      BEGIN
          UPDATE dbo.AssetMaster
          SET    [Name] = @Name,
				 CountryCode = @CountryCode,
				 LanguageCode = @LanguageCode,
				 UpdatedBy = @UpdatedBy,
				 UpdatedOn = @UpdatedOn,
                 Metadata = @Metadata,
                 PropertyMetadata = @PropertyMetadata
          WHERE  AssetId = @AssetId AND AssetTypeId = @AssetType
      END
    ELSE
      BEGIN
          INSERT INTO dbo.AssetMaster(
						AssetId,
						AssetTypeId,
						[Name],
						CountryCode,
						LanguageCode,
						UpdatedBy,
						UpdatedOn,
						Metadata,
						PropertyMetadata)
				VALUES(@AssetId,
                       @AssetType,
                       @Name,
					   @CountryCode,
					   @LanguageCode,
					   @UpdatedBy,
					   @UpdatedOn,
					   @Metadata,
					   @PropertyMetadata)
      END

GO

ALTER TABLE dbo.AssetProductImage
  ENABLE TRIGGER [AssetProductImageAfterInsertOrUpdate]

GO 