import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngstyle',
  templateUrl: './diretiva-ngstyle.component.html',
  styleUrls: ['./diretiva-ngstyle.component.scss']
})
export class DiretivaNgstyleComponent {

  ativo!: boolean;
  tamanhoFonte!: number;

  constructor(){
    this.tamanhoFonte = 10;
  }

  mudaAtivo() {
    this.ativo = !this.ativo;
  }

}
