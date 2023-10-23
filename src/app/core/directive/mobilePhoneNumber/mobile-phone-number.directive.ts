import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMobilePhoneNumber]',
})
export class MobilePhoneNumberDirective {
  constructor(private elementRef: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target.value']) onInput(value: string): void {
    const cleanedValue = value.replace(/\D/g, '').slice(0, 10);

    let formattedValue = '';
    if (cleanedValue.length > 0) {
      formattedValue = `(${cleanedValue.slice(0, 3)}`;
    }
    if (cleanedValue.length > 3) {
      formattedValue += `) ${cleanedValue.slice(3, 6)}`;
    }
    if (cleanedValue.length > 6) {
      formattedValue += `-${cleanedValue.slice(6)}`;
    }

    this.control.control?.setValue(formattedValue, { emitEvent: false });

    this.elementRef.nativeElement.value = formattedValue;
  }
}
