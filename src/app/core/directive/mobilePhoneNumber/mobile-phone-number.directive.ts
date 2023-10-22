import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMobilePhoneNumber]',
})
export class MobilePhoneNumberDirective {
  constructor(private elementRef: ElementRef) {}

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

    this.elementRef.nativeElement.value = formattedValue;
  }
}
