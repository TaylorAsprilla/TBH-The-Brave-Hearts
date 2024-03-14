import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCapitalizeFirstLetter]',
})
export class CapitalizeFirstLetterDirective {
  constructor(
    private elementRef: ElementRef,
    @Optional() private ngControl: NgControl
  ) {}

  @HostListener('blur')
  onBlur() {
    const value = this.elementRef.nativeElement.value;
    const formattedValue = this.capitalizeFirstLetter(value);
    this.updateValue(formattedValue);
  }

  private capitalizeFirstLetter(value: string): string {
    const words: string[] = value.split(' ');
    const formattedWords: string[] = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return formattedWords.join(' ');
  }

  private updateValue(value: string): void {
    if (this.ngControl.control) {
      this.ngControl.control.setValue(value);
    } else {
      this.elementRef.nativeElement.value = value;
    }
  }
}
