object DataModule1: TDataModule1
  Height = 480
  Width = 640
  object FDConnection1: TFDConnection
    Params.Strings = (
      'User_Name=postgres'
      'Password=123456'
      'Server=dunitx'
      'DriverID=PG'
      'MetaCurSchema=public')
    LoginPrompt = False
    Left = 144
    Top = 160
  end
  object FDPhysPgDriverLink1: TFDPhysPgDriverLink
    VendorLib = 'C:\Program Files (x86)\PostgreSQL\10\bin\libpq.dll'
    Left = 256
    Top = 160
  end
  object FDQuery1: TFDQuery
    CachedUpdates = True
    Connection = FDConnection1
    Left = 304
    Top = 224
  end
end
