import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgentModel } from 'src/app/core/models/agent.model';
import { CustomerModel } from 'src/app/core/models/customer.model';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';
import { UserType } from 'src/app/core/type/type';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss'],
})
export class ModalImageComponent implements OnInit {
  @ViewChild('modalImage') modalImage: TemplateRef<any>;

  @Input() showModal: boolean = false;
  @Input() user: AgentModel | CustomerModel;
  @Input() type: UserType;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() newImage: EventEmitter<string> = new EventEmitter<string>();

  modalRef: NgbModalRef;
  imageUpload: File;
  imgTemp: any = null;

  constructor(
    private modalService: NgbModal,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.showModal && changes.showModal.currentValue) {
      this.openVerticalCenteredModal();
    }
  }

  openVerticalCenteredModal() {
    this.modalService
      .open(this.modalImage, { centered: true })
      .result.then((result) => {
        this.close();
      })
      .catch((res) => {
        this.showModal = false;
        this.close();
      });
  }

  close() {
    this.imgTemp = null;
    this.closeModal.emit();
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.changeImage(files[0]);
    }
  }

  changeImage(file: File) {
    this.imageUpload = file;

    const validExtensions = ['png', 'jpg', 'jpeg'];
    const fileExtension =
      file && file.name ? file.name.split('.').pop()?.toLowerCase() : '';

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      Swal.fire({
        title: 'Error',
        html: `El fichero no contiene una extensión válida (${validExtensions.join(
          ', '
        )})`,
        icon: 'error',
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalService.dismissAll();
        }
      });
      this.imgTemp = null;
      return this.imgTemp;
    }

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      };
    } else {
      this.imgTemp = null;
      return this.imgTemp;
    }
  }

  uploadImage() {
    this.fileUploadService
      .updateImage(this.imageUpload, this.type, this.user.uid)
      .then((img) => {
        Swal.fire({
          title: 'Updated',
          html: 'The user image was updated',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll();
          }
        });
        this.newImage.emit(img);
      })
      .catch((err) => {
        console.log('err', err);
        Swal.fire({
          title: 'Error',
          html: 'Could not upload image',
          icon: 'error',
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll();
          }
        });
      });
  }
}
