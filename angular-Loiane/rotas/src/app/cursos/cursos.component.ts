import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CursosService } from './cursos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit, OnDestroy {

  cursos: any[] = [];
  pagina!: number;
  inscricao!: Subscription;

  constructor(private cursoService: CursosService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.cursos = this.cursoService.getCursos();

    this.inscricao = this.route.queryParams.subscribe(
      (queryParams) => {
        this.pagina = queryParams['pagina'];
      }
    );
  }

  proximaPagina() {
    //this.pagina++;
    this.router.navigate(['/cursos'], {queryParams: {'pagina': ++this.pagina}})
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }


}
