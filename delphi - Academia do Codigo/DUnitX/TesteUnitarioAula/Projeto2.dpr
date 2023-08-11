program Projeto2;

uses
  Vcl.Forms,
  Projeto.Principal in 'Projeto.Principal.pas' {Form2},
  Pessoa in 'Pessoa.pas',
  Conexao in 'Conexao.pas' {DataModule1: TDataModule},
  PessoaDAO in 'PessoaDAO.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.CreateForm(TDataModule1, DataModule1);
  Application.CreateForm(TForm2, Form2);
  Application.Run;
end.
