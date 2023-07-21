import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver() {
    //this._renderer2.setStyle(this._elementRef.nativeElement, 'background-color', 'yellow');
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    //this._renderer2.setStyle(this._elementRef.nativeElement, 'background-color', 'white');
    this.backgroundColor = 'white';
  }

  //@HostBinding('style.backgroundColor') backgroundColor!: string;
  @HostBinding('style.backgroundColor') get setColor() {
    //Algum código extra
    return this.backgroundColor;
  }

  private backgroundColor!: string;


  //constructor(
    //private _elementRef: ElementRef,
    //private _renderer2: Renderer2
  //) { }

}
