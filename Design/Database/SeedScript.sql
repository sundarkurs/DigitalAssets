INSERT INTO Country(Iso, Name) VALUES('IN', 'India')

GO
INSERT INTO Country(Iso, Name) VALUES('AU', 'Australia')

GO
INSERT INTO Language(Iso, Name) VALUES('EN', 'English')



GO
SET IDENTITY_INSERT AssetType ON

INSERT INTO AssetType(Id, Code, Name, Description, ImageUrl, Disabled, RootFolderId) 
	VALUES(1, 'PRODUCTIMAGE', 'Product Image', 'Product Image Description', '/images/asset-type-images/product-image.png', 0, 'DE6B1F74-455C-4B49-9941-B76D66B4CCB2')

INSERT INTO AssetType(Id, Code, Name, Description, ImageUrl, Disabled, RootFolderId) 
	VALUES(2, 'IMAGE', 'Image', 'Image Description', '/images/asset-type-images/image-type.jpeg', 0, '11DDA5FB-5B63-44FC-8165-2969882DC7E7')

SET IDENTITY_INSERT AssetType OFF





GO
INSERT INTO Folder(Id,  Name, ParentId, AssetType, UpdatedOn, UpdatedBy) 
	VALUES('DE6B1F74-455C-4B49-9941-B76D66B4CCB2', 'PRODUCTIMAGE', NULL, 1, GETDATE(), 'Sundar Urs')

GO
INSERT INTO Folder(Id,  Name, ParentId, AssetType, UpdatedOn, UpdatedBy) 
	VALUES('11DDA5FB-5B63-44FC-8165-2969882DC7E7', 'IMAGE', NULL, 1, GETDATE(), 'Sundar Urs')