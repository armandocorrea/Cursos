unit ProjetoTeste.Principal;

interface

uses
  DUnitX.TestFramework, Pessoa, PessoaDAO;

type
  [TestFixture]
  TMyTestObject = class
  private
    FPessoa: TPessoa;
    FPessoaDAO: TPessoaDAO;
  public
    [Setup]
    procedure Setup;
    [TearDown]
    procedure TearDown;
    [Test]
    procedure TesteTratarCPFCNPJ;
    [Test]
    [TestCase('CaseCPF', '123.123.123-12,12312312312')]
    [TestCase('CaseCNPJ', '12.123.123/0001-12,12123123000112')]
    procedure TratarCPFCNPJ(aValue: String; aResult: String);
    [Test]
    procedure ValidaNome;
    [Test]
    procedure ValidarCampos;
    //[Test]
    procedure Insert;
  end;

implementation

uses
  System.SysUtils,
  Delphi.Mocks;

procedure TMyTestObject.Insert;
begin
  try
    FPessoaDAO.Entidade.GUUID := '999999';
    FPessoaDAO.Entidade.NOME  := '999999';
    FPessoaDAO.Entidade.SENHA := '999999';
    FPessoaDAO.Entidade.TIPO  := 9;
    FPessoaDAO.Entidade.STATUS := 9;
    FPessoaDAO.Entidade.DATACADASTRO := now;
    FPessoaDAO.Entidade.DATAALTERACAO := now;
    FPessoaDAO.Insert;

    FPessoaDAO.BuscarId('999999');
    Assert.IsTrue(FPessoaDAO.Entidade.GUUID = '999999', 'TPessoaDAO.Insert Erro ao Inserir o GUUID');
    Assert.IsTrue(FPessoaDAO.Entidade.NOME = '999999', 'TPessoaDAO.Insert Erro ao Inserir o NOME');
    Assert.IsTrue(FPessoaDAO.Entidade.SENHA = '999999', 'TPessoaDAO.Insert Erro ao Inserir o SENHA');
    Assert.IsTrue(FPessoaDAO.Entidade.TIPO = 9, 'TPessoaDAO.Insert Erro ao Inserir o TIPO');
    Assert.IsTrue(FPessoaDAO.Entidade.STATUS = 9, 'TPessoaDAO.Insert Erro ao Inserir o STATUS');
    Assert.IsNotNull(FPessoaDAO.Entidade.DATACADASTRO, 'TPessoaDAO.Insert Erro ao Inserir o DATACADASTRO');
    Assert.IsNotNull(FPessoaDAO.Entidade.DATAALTERACAO, 'TPessoaDAO.Insert Erro ao Inserir o DATAALTERACAO');
  finally
    FPessoaDAO.Entidade.GUUID := '999999';
    FPessoaDAO.Delete;
  end;
end;

procedure TMyTestObject.Setup;
var
  Mock: TMock<ISession>;
begin
  Mock := TMock<ISession>.Create;
  Mock.Setup.WillReturn('UserTest');

  FPessoa := TPessoa.Create;
  FPessoaDAO := TPessoaDAO.Create(TStub<ILog>.Create, Mock);
end;

procedure TMyTestObject.TearDown;
begin
  FPessoa.Free;
  FPessoaDAO.Free;
end;

procedure TMyTestObject.TesteTratarCPFCNPJ;
var
  xResultado: String;
begin
  xResultado := FPessoa.TratarCPFCNPJ('123.123.123-12');
  Assert.IsTrue(xResultado = '12312312312', 'TPessoa.TratarCPFCNPJ retornou um erro.');
end;

procedure TMyTestObject.TratarCPFCNPJ(aValue, aResult: String);
var
  xResultado: String;
begin
  xResultado := FPessoa.TratarCPFCNPJ(aValue);
  //Assert.IsTrue(xResultado = aResult, 'TPessoa.TratarCPFCNPJ');
  Assert.AreEqual(xResultado, aResult);
end;

procedure TMyTestObject.ValidaNome;
begin
  FPessoa.Nome := 'Armando';
  Assert.IsNotEmpty(FPessoa.Nome, 'TPessoa.Nome está retornando vazio');
end;

procedure TMyTestObject.ValidarCampos;
begin
  FPessoa.Nome := '';
  Assert.WillRaise(FPessoa.ValidarCampos, nil, 'TPessoa.ValidarCampos');
end;

initialization
  TDUnitX.RegisterTestFixture(TMyTestObject);

end.
