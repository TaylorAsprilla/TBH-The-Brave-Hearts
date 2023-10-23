import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsnFormatDirective } from './ssn-format-directive.directive';

@NgModule({
  declarations: [SsnFormatDirective],
  imports: [CommonModule],
  exports: [SsnFormatDirective],
})
export class SsnFormatDirectiveModule {}
