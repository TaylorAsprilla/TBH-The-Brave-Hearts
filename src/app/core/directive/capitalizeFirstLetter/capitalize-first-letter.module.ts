import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstLetterDirective } from './capitalize-first-letter.directive';

@NgModule({
  declarations: [CapitalizeFirstLetterDirective],
  imports: [CommonModule],
  exports: [CapitalizeFirstLetterDirective],
})
export class CapitalizeFirstLetterModule {}
