import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss'],
})
export class ModalImageComponent implements OnInit {
  @ViewChild('verticalCenteredModal') verticalCenteredModal: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    // this.openVerticalCenteredModal(this.verticalCenteredModal);
  }

  openVerticalCenteredModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, { centered: true })
      .result.then((result) => {
        console.log('Modal closed' + result);
      })
      .catch((res) => {});
  }
}
