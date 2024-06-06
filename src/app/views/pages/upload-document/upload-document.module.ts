import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDocumentComponent } from './upload-document.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploadDocumentComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UploadDocumentComponent],
})
export class UploadDocumentModule {}
