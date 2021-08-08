GO

DROP TRIGGER [dbo].[AssetImageAfterDelete]

GO

SET quoted_identifier ON

go

CREATE TRIGGER [dbo].[AssetImageAfterDelete]
ON [dbo].[AssetImage]
FOR DELETE
AS
    DECLARE @Id UNIQUEIDENTIFIER

    SELECT @Id = DEL.Id
    FROM   deleted DEL;

    DELETE FROM dbo.AssetMaster
    WHERE  Id = @Id AND AssetTypeId = 2
go

ALTER TABLE [dbo].[AssetImage]
  enable TRIGGER [AssetImageAfterDelete]

go 