unit PessoaDAO;

interface

{$M+}

uses
  Pessoa, FireDAC.Comp.Client;

type
  ILog = interface
    ['{4F234ADC-4EAA-4B6D-BC9A-1FFED3B681ED}']
    procedure GravarLog(aLog: String);
  end;

  ISession = interface
    ['{45D90CF8-17AB-4E28-8426-9DD27BECDE69}']
    function User: String;
  end;

  TPessoaDAO = class
    private
      FLog: ILog;
      FSession: ISession;
      FPessoa: TPessoa;
      FQuery: TFDQuery;
    public
      constructor Create(aLog: ILog; aSession: ISession);
      destructor Destroy; override;

      function Entidade: TPessoa;
      procedure ValidarCampos;
      procedure Insert;
      procedure Update;
      procedure Delete;
      procedure BuscarId(aId: String);
  end;

implementation

{ TPessoaDAO }

uses Conexao, System.SysUtils;

procedure TPessoaDAO.BuscarId(aId: String);
begin
  FQuery.Open('SELECT * FROM USUARIO WHERE GUUID = ' + QuotedStr(FPessoa.GUUID));
  FQuery.First;
  FPessoa.GUUID := FQuery.FieldByName('GUUID').AsString;
  FPessoa.NOME := FQuery.FieldByName('NOME').AsString;
  FPessoa.SENHA := FQuery.FieldByName('SENHA').AsString;
  FPessoa.TIPO := FQuery.FieldByName('TIPO').AsInteger;
  FPessoa.STATUS := FQuery.FieldByName('STATUS').AsInteger;
  FPessoa.DATACADASTRO := FQuery.FieldByName('DATACADASTRO').AsDateTime;
  FPessoa.DATAALTERACAO := FQuery.FieldByName('DATAALTERACAO').AsDateTime;
end;

constructor TPessoaDAO.Create(aLog: ILog; aSession: ISession);
begin
  FLog := aLog;
  FSession := aSession;

  FLog.GravarLog('User: ' + aSession.User);

  FPessoa := TPessoa.Create;

  if not Assigned(DataModule1) then
    DataModule1 := TDataModule1.Create(nil);

  FQuery := DataModule1.FDQuery1;
end;

procedure TPessoaDAO.Delete;
begin
  FQuery.Open('SELECT * FROM USUARIO WHERE GUUID = ' + QuotedStr(FPessoa.GUUID));
  FQuery.Delete;
  FQuery.ApplyUpdates(0);
end;

destructor TPessoaDAO.Destroy;
begin
  FreeAndNil(FPessoa);
  inherited;
end;

function TPessoaDAO.Entidade: TPessoa;
begin
  Result := FPessoa;
end;

procedure TPessoaDAO.Insert;
begin
  //ValidarCampos;
  FQuery.Open('SELECT * FROM USUARIO WHERE 1=2');
  FQuery.Append;
  FQuery.FieldByName('GUUID').Value := FPessoa.GUUID;
  FQuery.FieldByName('NOME').Value := FPessoa.NOME;
  FQuery.FieldByName('SENHA').Value := FPessoa.SENHA;
  FQuery.FieldByName('TIPO').Value := FPessoa.TIPO;
  FQuery.FieldByName('STATUS').Value := FPessoa.STATUS;
  FQuery.FieldByName('DATACADASTRO').Value := FPessoa.DATACADASTRO;
  FQuery.FieldByName('DATAALTERACAO').Value := FPessoa.DATAALTERACAO;
  FQuery.Post;
  FQuery.ApplyUpdates(0);
end;

procedure TPessoaDAO.Update;
begin
  FQuery.Open('SELECT * FROM USUARIO WHERE GUUID = ' + QuotedStr(FPessoa.GUUID));
  FQuery.Edit;
  FQuery.FieldByName('GUUID').Value := FPessoa.GUUID;
  FQuery.FieldByName('NOME').Value := FPessoa.NOME;
  FQuery.FieldByName('SENHA').Value := FPessoa.SENHA;
  FQuery.FieldByName('TIPO').Value := FPessoa.TIPO;
  FQuery.FieldByName('STATUS').Value := FPessoa.STATUS;
  FQuery.FieldByName('DATACADASTRO').Value := FPessoa.DATACADASTRO;
  FQuery.FieldByName('DATAALTERACAO').Value := FPessoa.DATAALTERACAO;
  FQuery.Post;
  FQuery.ApplyUpdates(0);
end;

procedure TPessoaDAO.ValidarCampos;
begin

end;

end.
