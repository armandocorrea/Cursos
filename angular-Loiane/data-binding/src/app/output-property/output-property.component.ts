import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.scss'],
  //outputs: ['mudouValor']
})
export class OutputPropertyComponent {

  @Input() valor: number = 0;

  @Output() mudouValor = new EventEmitter();

  @ViewChild('campoInput5') campoValorInput: any;
  //@ViewChild('campoInput5') campoValorInput: ElementRef;

  incrementa() {
    console.log(this.campoValorInput?.nativeElement.value);
    //this.valor++;
    this.campoValorInput.nativeElement.value++;
    this.mudouValor.emit({novoValor: this.valor});
  }

  decrementa() {
    //this.valor--;
    this.campoValorInput.nativeElement.value--;
    this.mudouValor.emit({novoValor: this.valor});
  }

}
