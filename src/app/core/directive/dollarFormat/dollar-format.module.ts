import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DollarFormatDirective } from './dollar-format.directive';

@NgModule({
  declarations: [DollarFormatDirective],
  imports: [CommonModule],
  exports: [DollarFormatDirective],
  providers: [CurrencyPipe],
})
export class DollarFormatModule {}
