import { Injectable } from '@angular/core';

//@Injectable - Decorador para dizer que essa classe pode ser injetada em outras
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  getCursos() {
    return ['Java', 'Ext-JS', 'Angular'];
  }
}
