import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[app-grid]',
})
export class GridDirective {
  @Input() public width: string | number;
  @Input() public height: string | number;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    const list = this.elementRef.nativeElement.classList;
    list.add('grid');
  }

  ngOnInit(): void {
    const style = this.elementRef.nativeElement.style;
    style.gridTemplateRows = this.repeat(this.height);
    style.gridTemplateColumns = this.repeat(this.width);
  }

  private repeat(size: number | string): string {
    return `repeat(${Number(size)}, 1fr)`;
  }
}
