import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SearchesComponent } from './searches.component';

@NgModule({
  declarations: [SearchesComponent],
  imports: [CommonModule, BrowserModule],
  exports: [SearchesComponent],
})
export class SearchesModule {}
