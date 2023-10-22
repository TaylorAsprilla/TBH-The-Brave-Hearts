import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSsnFormat]',
})
export class SsnFormatDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 9);
    if (value.length > 0) {
      input.value = this.formatSsn(value);
    }
  }

  private formatSsn(value: string): string {
    return value.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
  }
}
