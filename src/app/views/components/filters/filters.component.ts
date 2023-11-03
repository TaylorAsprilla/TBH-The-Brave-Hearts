import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterOption } from 'src/app/core/interfaces/filter-option';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() filterOptions: FilterOption[] = [];

  @Output() filterData: EventEmitter<FilterOption[]> = new EventEmitter<
    FilterOption[]
  >();
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();

  hideFilters: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  applyFilters() {
    this.filterData.emit(this.filterOptions);
  }

  onFilterData() {
    // Emitir eventos con los datos de los filtros
    this.filterData.emit(this.filterOptions);
  }

  onSearchData(query: string) {
    // Emitir un evento con la consulta de búsqueda
    this.searchQuery.emit(query);
  }

  toggleFilters() {
    this.hideFilters = !this.hideFilters;
  }

  resetSelect() {
    this.reset.emit();
  }
}
