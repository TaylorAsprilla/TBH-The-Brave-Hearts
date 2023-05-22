import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
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

  constructor(
    private prospectService: ProspectService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.prospectSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadProspects();
  }

  loadProspects() {
    this.loading = true;
    this.prospectSubscription = this.prospectService
      .getAllProspects()
      .subscribe((prospet) => {
        this.prospects = prospet.filter((prospet) => {
          return prospet.active === true;
        });
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

  deleteProspect(prospect: ProspectModel) {
    Swal.fire({
      title: 'Are you sure?',
      html: `You want to eliminate prospect <b>${prospect.firstName} ${prospect.lastName}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prospectService.deleteProspect(prospect).subscribe({
          next: (res) => {
            this.loadProspects();
            Swal.fire('Deleted!', 'Prospect has been removed.', 'success');
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
              title: 'Error deleting prospect',
              icon: 'error',
              html: `${
                errorList.length ? errorList.join('') : error.error.msg
              }`,
            });
          },
        });
      }
    });
  }

  trackByProspectId(index: number, prospect: ProspectModel): string {
    return prospect.uid;
  }

  editProspect(prospect: ProspectModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${prospect.uid}`
    );
  }

  newProspect() {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${TEXT.NEW}`
    );
  }
}
