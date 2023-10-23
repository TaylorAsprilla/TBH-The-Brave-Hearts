import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDollarFormat]',
})
export class DollarFormatDirective {
  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe,
    private control: NgControl
  ) {}

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const formattedValue = this.formatValue(numericValue);
    this.updateValue(formattedValue);
    this.updateView(formattedValue);
  }

  private formatValue(value: string): string {
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      return (
        this.currencyPipe.transform(parsedValue, 'USD', 'symbol', '1.2-2') || ''
      );
    } else {
      return '';
    }
  }

  private updateValue(value: string): void {
    if (this.control && this.control.control) {
      this.control.control.setValue(value, { emitEvent: false });
    }
  }

  private updateView(value: string): void {
    this.elementRef.nativeElement.value = value;
  }
}
