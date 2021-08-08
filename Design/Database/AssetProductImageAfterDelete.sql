GO

DROP TRIGGER [dbo].[AssetProductImageAfterDelete]

GO

SET quoted_identifier ON

go

CREATE TRIGGER [dbo].[AssetProductImageAfterDelete]
ON [dbo].[AssetProductImage]
FOR DELETE
AS
    DECLARE @Id UNIQUEIDENTIFIER

    SELECT @Id = DEL.Id
    FROM   deleted DEL;

    DELETE FROM dbo.AssetMaster
    WHERE  Id = @Id AND AssetTypeId = 1;
go

ALTER TABLE [dbo].[AssetProductImage]
  enable TRIGGER [AssetProductImageAfterDelete]

go 