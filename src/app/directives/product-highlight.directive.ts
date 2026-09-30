import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appProductHighlight]'
})
export class ProductHighlightDirective implements OnInit {
  @Input() featured: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.featured) {
      this.renderer.addClass(this.el.nativeElement, 'featured-product');
    }
  }
}
