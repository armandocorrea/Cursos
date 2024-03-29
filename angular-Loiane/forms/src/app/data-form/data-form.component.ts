import { VerificaEmailService } from './services/verifica-email.service';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, distinctUntilChanged, empty, map, switchMap, tap } from 'rxjs';
import { FormValidations } from '../shared/form-validators';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario!: FormGroup;
  //estados?: EstadoBr[];

  estados?: Observable<EstadoBr[]>;
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any;

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService) {
      super();
    }

  ngOnInit(): void {
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),

      endereco: new FormGroup({
        cep: new FormControl(null)
      })
    });*/

    /*this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        this.estados = dados;
        console.log(this.estados);
      })*/

    this.verificaEmailService.verificarEmail('').subscribe();

    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required, FormValidations.cepValidation],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.consultaCepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados?.filter((e: any) => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe((cidades: any) => this.cidades = cidades);
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    //return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1)));
  }

  override submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario?.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    if (this.formulario?.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe(dados => {
          console.log(dados);

          //Reseta o form
          this.formulario?.reset();
        },
        (error: any) => alert('erro'));
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  consultaCEP() {
    // Nova variável "cep" somente com dígitos.
    let cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.consultaCepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

}
