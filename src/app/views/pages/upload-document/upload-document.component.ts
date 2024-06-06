import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/services/document/document.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
})
export class UploadDocumentComponent implements OnInit {
  documentForm: FormGroup;
  documents: any[] = [];
  selectedDocumentId: string | null = null;
  documentUrl: string = environment.document;

  constructor(
    private documentService: DocumentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      file: [null, Validators.required],
    });

    this.loadDocuments();
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentForm.get('file')?.setValue(file);
    }
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe((docs: any) => {
      this.documents = docs.documents;
    });
  }

  onSubmit() {
    if (this.documentForm.invalid) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please select a document to upload.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('document', this.documentForm.get('file')?.value);

    if (this.selectedDocumentId) {
      this.updateDocument(this.selectedDocumentId, formData);
    } else {
      this.uploadDocument(formData);
    }
  }

  uploadDocument(formData: FormData) {
    this.documentService.uploadDocument(formData).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Document',
          html: `Document uploaded successfully, ${response.document.filename}`,
        });
        this.loadDocuments();
        this.documentForm.reset();
      },
      error: (error: any) => {
        this.handleError(error, 'Error uploading document');
      },
    });
  }

  updateDocument(documentId: string, formData: FormData) {
    this.documentService.updateDocument(documentId, formData).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Document',
          html: `Document updated successfully, ${response.filename}`,
        });
        this.loadDocuments();
        this.documentForm.reset();
        this.selectedDocumentId = null;
      },
      error: (error: any) => {
        this.handleError(error, 'Error updating document');
      },
    });
  }

  editDocument(document: any) {
    this.selectedDocumentId = document.id;
    // Optionally, you can pre-fill the form with document data if needed
  }

  disableDocument(documentId: string) {
    this.documentService.disableDocument(documentId).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Document',
          html: `Document disabled successfully`,
        });
        this.loadDocuments();
      },
      error: (error: any) => {
        this.handleError(error, 'Error disabling document');
      },
    });
  }

  handleError(error: any, title: string) {
    const errors = error?.error?.errors;
    const errorList: string[] = [];

    if (errors) {
      Object.entries(errors).forEach(([key, value]: [string, any]) => {
        if (value && value['msg']) {
          errorList.push('° ' + value['msg'] + '<br>');
        }
      });
    }

    Swal.fire({
      title,
      icon: 'error',
      html: `${errorList.length ? errorList.join('') : error.error.msg}`,
    });
  }
}
