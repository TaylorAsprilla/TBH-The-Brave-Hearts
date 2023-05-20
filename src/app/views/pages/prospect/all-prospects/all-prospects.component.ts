import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProspectModel } from 'src/app/core/models/prospect.model';
import { ProspectService } from 'src/app/services/prospect/prospect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-prospects',
  templateUrl: './all-prospects.component.html',
  styleUrls: ['./all-prospects.component.scss'],
})
export class AllProspectsComponent implements OnInit {
  prospectSubscription: Subscription;
  prospects: ProspectModel[] = [];

  loading: boolean = false;

  statusColors: { [key: string]: string } = {
    NEW: 'blue',
    PROGRESS: 'orange',
    NOT_INTERESTED: 'red',
    CUSTOMER: 'green',
  };

  constructor(private prospectService: ProspectService) {}

  ngOnDestroy(): void {
    this.prospectSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadProspects();
  }

  loadProspects() {
    this.loading = true;
    this.prospectSubscription = this.prospectService
      .getProspects()
      .subscribe((resp) => {
        this.prospects = resp;
        this.loading = false;
      });
  }

  changeStatus(prospect: ProspectModel) {
    this.prospectService.updateProspect(prospect).subscribe({
      next: (resp: any) => {
        Swal.fire({
          position: 'bottom-end',
          html: 'Prospect status updated.',
          showConfirmButton: false,
          timer: 1000,
        });
      },
      error: (error: any) => {
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
          title: 'Error creating agent',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }

  deleteProspect(prospect: ProspectModel) {}

  trackByProspectId(index: number, prospect: ProspectModel): string {
    return prospect.uid;
  }
}
