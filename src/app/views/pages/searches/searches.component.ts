import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { ProspectModel } from 'src/app/core/models/prospect.model';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { PolicyModel } from 'src/app/core/models/policy.model';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.scss'],
})
export class SearchesComponent implements OnInit {
  prospects: ProspectModel[] = [];
  customers: CustomerModel[] = [];
  policies: PolicyModel[] = [];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(({ value }) => {
      this.globalSearch(value);
    });
  }

  globalSearch(value: string) {
    this.searchService.fullSearch(value).subscribe((resp: any) => {
      this.prospects = resp.prospects;
      this.customers = resp.customer;
      this.policies = resp.policy;
    });
  }

  openProspect(prospect: ProspectModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${prospect.uid}`
    );
  }

  openCustomer(customer: CustomerModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.EDIT_CUSTOMERS}/${customer.uid}`
    );
  }

  openPolicy(idPolicy: string) {
    const queryParams = {
      idPolicy,
    };

    const url = `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}`;

    this.router.navigate([url], { queryParams });
  }
}
