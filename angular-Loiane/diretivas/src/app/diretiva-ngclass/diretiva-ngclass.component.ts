import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngclass',
  templateUrl: './diretiva-ngclass.component.html',
  styleUrls: ['./diretiva-ngclass.component.scss']
})
export class DiretivaNgclassComponent {

  meuFavorito!: boolean;

  onClick() {
    this.meuFavorito = !this.meuFavorito;
  }

}
