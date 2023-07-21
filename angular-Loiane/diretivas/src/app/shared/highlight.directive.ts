import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @HostListener('mouseenter') onMouseOver() {
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor!: string;

  @Input() defaultColor: string;
  @Input('appHighlight') highlightColor: string;

  constructor () {
    this.defaultColor = 'white',
    this.highlightColor = 'yellow'
  }

  ngOnInit() {
    this.backgroundColor = this.defaultColor
  }

}
