import { AgentService } from 'src/app/services/agent/agent.service';
import { ProspectService } from 'src/app/services/prospect/prospect.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ProspectModel } from 'src/app/core/models/prospect.model';
import { AgentModel } from 'src/app/core/models/agent.model';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { PolicyModel } from 'src/app/core/models/policy.model';
import Swal from 'sweetalert2';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { Router } from '@angular/router';
import { TEXT } from 'src/app/core/enum/text.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true,
})
export class DashboardComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  customers: CustomerModel[] = [];
  prospects: ProspectModel[] = [];
  agents: AgentModel[] = [];
  policy: PolicyModel[] = [];

  totalCustomers: number;
  totalAgents: number;
  totalProspects: number;
  totalPolicy: number;

  nameAgents: string;

  filteredProspects: ProspectModel[] = [];
  orderFieldProspect: string = 'firstName';
  orderTypeProspect: 'asc' | 'desc' = 'asc';

  filteredCustomer: CustomerModel[] = [];
  orderFieldCustomer: string = 'firstName';
  orderTypeCustomer: 'asc' | 'desc' = 'asc';

  customerSubscription: Subscription;
  prospectSubscription: Subscription;
  agentSubscription: Subscription;
  policySubcription: Subscription;

  constructor(
    private customerService: CustomerService,
    private prospectService: ProspectService,
    private agentService: AgentService,
    private policyService: PolicyService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
    this.prospectSubscription?.unsubscribe();
    this.agentSubscription?.unsubscribe();
    this.policySubcription?.unsubscribe();
  }

  ngOnInit(): void {
    this.nameAgents = `${this.agentService.agent.firstName} ${this.agentService.agent.lastName}`;

    this.loadCustomers();
    this.loadProspects();
    this.loadAgents();
    this.loadPolicy();
  }

  loadCustomers() {
    this.loading = true;
    this.customerSubscription = this.customerService
      .getAllCustomers()
      .subscribe((resp) => {
        this.customers = resp.customers
          .filter((customer) => customer.active === true)
          .slice(-10);

        this.filteredCustomer = this.customers;

        this.totalCustomers = resp.customers.filter(
          (customer) => customer.active === true
        ).length;

        this.loading = false;
      });
  }

  loadProspects() {
    this.loading = true;
    this.prospectSubscription = this.prospectService
      .getAllProspects()
      .subscribe((prospect) => {
        this.prospects = prospect
          .filter((prospect) => prospect.active === true)
          .slice(-10);

        this.filteredProspects = this.prospects;

        this.totalProspects = prospect.filter(
          (prospect) => prospect.active === true
        ).length;

        this.loading = false;
      });
  }

  loadAgents() {
    this.loading = true;
    this.agentSubscription = this.agentService
      .getAllAgents()
      .subscribe((resp) => {
        this.agents = resp.agents
          .filter((agent) => agent.active === true)
          .slice(-10);

        this.totalAgents = resp.agents.filter(
          (agent) => agent.active === true
        ).length;

        this.loading = false;
      });
  }

  loadPolicy() {
    this.loading = true;
    this.policySubcription = this.policyService
      .getAllPolicy()
      .subscribe((resp) => {
        this.policy = resp.policy
          .filter((policy) => policy.active === true)
          .slice(-10);

        this.totalPolicy = resp.policy.filter(
          (policy) => policy.active === true
        ).length;

        this.loading = false;
      });
  }

  moreInfoCustomer(customer: CustomerModel) {
    const dateOfBirth = customer.dateBirth;
    const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString(
      'en-US'
    );

    Swal.fire({
      title: 'Info Customer',
      showCloseButton: true,
      html: `<div class="row">
            <div class="col-md-12 text-start">
              <table class="table">
                <tbody>
                <tr>
                    <th>Name:</th>
                    <td>${customer.firstName} ${customer.middleName} ${customer.lastName}</td>
                  </tr>
                  <tr>
                  <tr>
                    <th>Address:</th>
                    <td>${customer.address}</td>
                  </tr>
                  <tr>
                    <th>Address Line 2:</th>
                    <td>${customer.addressLine2}</td>
                  </tr>
                  <tr>
                    <th>City:</th>
                    <td>${customer.city}</td>
                  </tr>
                  <tr>
                    <th>State:</th>
                    <td>${customer.state}</td>
                  </tr>
                  <tr>
                    <th>Zip Code:</th>
                    <td>${customer.zipCode}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>${customer.phone}</td>
                  </tr>
                  <tr>
                    <th>Phone Type:</th>
                    <td>${customer.documentType}</td>
                  </tr>
                  <tr>
                  <th>Document Number:</th>
                  <td>${customer.documentNumber}</td>
                </tr>
                <tr>
                  <th>Document Type:</th>
                  <td>${customer.documentType}</td>
                </tr>
                <tr>
                  <th>Marital Status:</th>
                  <td>${customer.maritalStatus}</td>
                </tr>
                <tr>
                  <th>Date of Birth:</th>
                  <td>${formattedDateOfBirth}</td>
                </tr>
                <tr>
                  <th>Country of Birth:</th>
                  <td>${customer.countryBirth}</td>
                </tr>
                <tr>
                  <th>City of Birth:</th>
                  <td>${customer.cityBirth}</td>
                </tr>
                <tr>
                  <th>Gender:</th>
                  <td>${customer.gender}</td>
                </tr>
                <tr>
                  <th>Weight:</th>
                  <td>${customer.weight}</td>
                </tr>
                <tr>
                  <th>Height:</th>
                  <td>${customer.height}</td>
                </tr>
                <tr>
                  <th>Employer Name:</th>
                  <td>${customer.employerName}</td>
                </tr>
                <tr>
                  <th>Occupation:</th>
                  <td>${customer.occupation}</td>
                </tr>
                <tr>
                  <th>Time Employed:</th>
                  <td>${customer.timeEmployed}</td>
                </tr>
                <tr>
                  <th>Annual Income:</th>
                  <td>${customer.annualIncome}</td>
                </tr>
                <tr>
                  <th>Household Income:</th>
                  <td>${customer.householdIncome}</td>
                </tr>
                <tr>
                  <th>Household Net Worth:</th>
                  <td>${customer.householdNetWorth}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>`,
      icon: 'info',
    });
  }

  addPolicy(customer: CustomerModel) {
    Swal.fire({
      title: 'Policy!',
      html: `Do you want to add a policy to the client <b>${customer.firstName} ${customer.lastName}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add a policy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(
          `${ROUTE_APP.POLICY}/${ROUTE_APP.ADD_POLICY}/${customer.uid}`
        );
      }
    });
  }

  moreInfoProspect(prospect: ProspectModel) {
    const dateOfBirth = prospect.dateBirth;
    const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString(
      'en-US'
    );

    Swal.fire({
      title: 'Info Prospect',
      showCloseButton: true,
      html: `<div class="row">
            <div class="col-md-12 text-start">
              <table class="table">
                <tbody>
                <tr>
                    <th>Name:</th>
                    <td>${prospect.firstName} ${prospect.middleName} ${prospect.lastName}</td>
                  </tr>
                    <tr>
                  <th>Email:</th>
                  <td>${prospect.email}</td>
                </tr>
                <tr>
                    <th>Phone:</th>
                    <td>${prospect.phone}</td>
                  </tr>
                  <tr>
                    <th>State:</th>
                    <td>${prospect.state}</td>
                  </tr>

                  <tr>
                    <th>Document Type:</th>
                    <td>${prospect.documentType}</td>
                  </tr>
                <tr>
                  <th>Date Birth:</th>
                  <td>${formattedDateOfBirth}</td>
                </tr>
                <tr>
                  <th>Partner:</th>
                  <td>${prospect.partner}</td>
                </tr>
                <tr>
                  <th>Occupation:</th>
                  <td>${prospect.occupation}</td>
                </tr>
                 <tr>
                  <th>Household Income:</th>
                  <td>${prospect.householdIncome}</td>
                </tr>
                <tr>
                  <th>Children:</th>
                  <td>${prospect.children}</td>
                </tr>
                <tr>
                  <th>Children Age:</th>
                  <td>${prospect.childrenAge}</td>
                </tr>
                <tr>
                  <th>Children Occupation:</th>
                  <td>${prospect.childrenOccupation}</td>
                </tr>
                <tr>
                  <th>Retirement Plans:</th>
                  <td>${prospect.retirementPlans}</td>
                </tr>
                <tr>
                  <th>Life Insurance:</th>
                  <td>${prospect.lifeInsurance}</td>
                </tr>
                <tr>
                  <th>Discretionary Income:</th>
                  <td>${prospect.discretionaryIncome}</td>
                </tr>
                <tr>
                  <th>Properties:</th>
                  <td>${prospect.properties}</td>
                </tr>
                <tr>
                  <th>Other Income:</th>
                  <td>${prospect.otherIncome}</td>
                </tr>
                <tr>
                  <th>Observations:</th>
                  <td>${prospect.observations}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>`,
      icon: 'info',
    });
  }

  salesPolicy(prospect: ProspectModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ADD_CUSTOMERS}/${ROUTE_APP.PROSPECT}/${prospect.uid}`
    );
  }

  linkAllAgents() {
    this.router.navigateByUrl(`${ROUTE_APP.AGENT}/${ROUTE_APP.ALL_AGENTS}`);
  }

  linkNewAgent() {
    this.router.navigateByUrl(
      `${ROUTE_APP.AGENT}/${ROUTE_APP.ADD_AGENTS}/${TEXT.NEW}`
    );
  }

  moreInfoAgent(agent: AgentModel) {
    const dateOfBirth = agent.dateBirth;
    const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString(
      'en-US'
    );

    Swal.fire({
      title: 'Info Agent',
      showCloseButton: true,
      html: `<div class="row">
            <div class="col-md-12 text-start">
              <table class="table">
                <tbody>
                <tr>
                    <th>Name:</th>
                    <td>${agent.firstName} ${agent.lastName}</td>
                  </tr>
                  <tr>
                  <tr>
                    <th>Agent Code:</th>
                    <td>${agent.agentCode}</td>
                  </tr>
                   <tr>
                    <th>Email:</th>
                    <td>${agent.email}</td>
                  </tr>
                  <tr>
                  <th>Date of Birth:</th>
                  <td>${formattedDateOfBirth}</td>
                </tr>
                  <tr>
                    <th>State:</th>
                    <td>${agent.state}</td>
                  </tr>
                  <tr>
                    <th>City:</th>
                    <td>${agent.city}</td>
                  </tr>
                  <tr>
                    <th>Zip:</th>
                    <td>${agent.zip}</td>
                  </tr>
                  <tr>
                  <th>Role:</th>
                  <td>${agent.role}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>`,
      icon: 'info',
    });
  }

  sortProspectBy(field: string) {
    if (field === this.orderFieldProspect) {
      this.orderTypeProspect =
        this.orderTypeProspect === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderFieldProspect = field;
      this.orderTypeProspect = 'asc';
    }

    this.filteredProspects.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return this.orderTypeProspect === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return this.orderTypeProspect === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  sortCustomerBy(field: string) {
    if (field === this.orderFieldCustomer) {
      this.orderTypeCustomer =
        this.orderTypeCustomer === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderFieldCustomer = field;
      this.orderTypeCustomer = 'asc';
    }

    this.filteredCustomer.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return this.orderTypeCustomer === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return this.orderTypeCustomer === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  linkAllProspects() {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ALL_PROSPECTS}`
    );
  }

  linkNewProspect() {
    this.router.navigateByUrl(
      `${ROUTE_APP.PROSPECT}/${ROUTE_APP.ADD_PROSPECTS}/${TEXT.NEW}`
    );
  }

  linkAllCustomers() {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ALL_CUSTOMERS}`
    );
  }

  linkNewCustomers() {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ADD_CUSTOMERS}/${TEXT.NEW}`
    );
  }
}
