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

  nameAgents: string;

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
    this.nameAgents =
      this.agentService.agent.firstName + this.agentService.agent.lastName;

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
        this.customers = resp.customers;
        this.loading = false;
      });
  }

  loadProspects() {
    this.loading = true;
    this.prospectSubscription = this.prospectService
      .getAllProspects()
      .subscribe((prospect) => {
        this.prospects = prospect;
        this.loading = false;
      });
  }

  loadAgents() {
    this.loading = true;
    this.agentSubscription = this.agentService
      .getAllAgents()
      .subscribe((resp) => {
        this.agents = resp.agents;
        this.loading = false;
      });
  }

  loadPolicy() {
    this.loading = true;
    this.policySubcription = this.policyService
      .getAllPolicy()
      .subscribe((resp) => {
        this.policy = resp.policy;
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
}
