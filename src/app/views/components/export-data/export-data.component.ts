import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ExporterService } from 'src/app/services/exporter/exporter.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss'],
})
export class ExportDataComponent implements OnInit {
  @Input() nameFile: string = '';
  @Input() data: any[];
  @Input() dataFiltered: any[];

  exportDataFiltred: string[] = [];

  constructor(private exporterService: ExporterService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataFiltered) {
      this.exportDataFiltred = changes.dataFiltered.currentValue;
    }
  }

  exportAsXLSX(): void {
    this.exporterService.exportToExcel(this.data, this.nameFile);
  }

  exportAsXLSXFiltered(): void {
    this.exporterService.exportToExcel(
      this.exportDataFiltred,
      `${this.nameFile}_filtred`
    );
  }
}
