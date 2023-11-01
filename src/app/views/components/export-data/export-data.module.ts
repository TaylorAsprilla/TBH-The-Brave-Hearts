import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportDataComponent } from './export-data.component';
import { ExporterService } from 'src/app/services/exporter/exporter.service';

@NgModule({
  declarations: [ExportDataComponent],
  imports: [CommonModule],
  exports: [ExportDataComponent],
  providers: [ExporterService],
})
export class ExportDataModule {}
