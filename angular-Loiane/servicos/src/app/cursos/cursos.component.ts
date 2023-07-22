import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {

    cursos!: string[];
    //cursosService!: CursosService;

    constructor (private cursosService: CursosService) {
      //this.cursosService = new CursosService();
      //this.cursosService = _cursosService;
    }

    ngOnInit() {
      this.cursos = this.cursosService.getCursos();

      this.cursosService.emitirCursoCriado.subscribe(
        curso => console.log(curso)
      );

      CursosService.criouNovoCriado.subscribe(
        curso => this.cursos.push(curso)
      );
    }

}
