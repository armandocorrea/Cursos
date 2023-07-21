import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: ['./diretiva-ngif.component.scss']
})
export class DiretivaNgifComponent {

  cursos: string[] = ['Angular 2'];

  mostrarCursos!: boolean;

  onMostrarCursos() {
    this.mostrarCursos = !this.mostrarCursos;
  }

}
