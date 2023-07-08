import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { MeuPrimeiro2Component } from './meu-primeiro2/meu-primeiro2.component';
import { CursosComponent } from './cursos/cursos/cursos.component';
import { CursosModule } from './cursos/cursos.module';

@NgModule({
  //Componentes, Diretivas e Pipes
  declarations: [
    AppComponent,
    MeuPrimeiroComponent,
    MeuPrimeiro2Component,
  ],
  //Outros Módulos
  imports: [
    BrowserModule,
    AppRoutingModule,

    CursosModule,
  ],
  //Serviços disponíveis para os módulos
  providers: [],
  //Componente a ser instanciado - Componente principal
  bootstrap: [AppComponent]
})
export class AppModule { }
