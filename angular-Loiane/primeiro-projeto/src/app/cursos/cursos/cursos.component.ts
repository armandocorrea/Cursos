import { Component } from '@angular/core';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {

  //nomePortal: any;  - Sem Tipagem
  nomePortal: string;

  cursos: string[] = [];

  constructor(private cursosService: CursosService) {
    this.nomePortal = 'http://loiane.training';

    //Sem Injeção de Dependencia
    //var servico = new CursosService();

    this.cursos = this.cursosService.getCursos();
  }

}
