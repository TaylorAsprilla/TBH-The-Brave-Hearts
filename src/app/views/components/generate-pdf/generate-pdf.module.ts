import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratePdfComponent } from './generate-pdf.component';

@NgModule({
  declarations: [GeneratePdfComponent],
  imports: [CommonModule],
  exports: [GeneratePdfComponent],
})
export class GeneratePdfModule {}
