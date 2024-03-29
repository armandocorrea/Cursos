import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosGuard } from '../guards/alunos.guard';
import { AlunosDeactivateGuard } from '../guards/alunos.deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

const alunosRoutes: Routes = [
  { path: '', component: AlunosComponent,
  canActivateChild: [AlunosGuard],
  children: [
    //Hardcoded vem primeiro
    { path: 'novo', component: AlunoFormComponent},
    //Id que é dinamico vem depois
    { path: ':id', component: AlunoDetalheComponent, resolve: { aluno: AlunoDetalheResolver }},
    { path: ':id/editar', component: AlunoFormComponent, canDeactivate: [AlunosDeactivateGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule {}
