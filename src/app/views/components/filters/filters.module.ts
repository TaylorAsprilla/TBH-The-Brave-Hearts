import { NgModule } from '@angular/core';
import { FiltersComponent } from './filters.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, FormsModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}
