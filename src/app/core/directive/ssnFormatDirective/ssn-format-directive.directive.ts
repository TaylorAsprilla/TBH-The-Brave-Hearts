import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSsnFormat]',
})
export class SsnFormatDirective {
  constructor(private elementRef: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 9);
    if (value.length > 0) {
      input.value = this.formatSsn(value);

      this.control.control?.setValue(input.value, { emitEvent: false });
    }
  }

  private formatSsn(value: string): string {
    return value.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
  }
}
