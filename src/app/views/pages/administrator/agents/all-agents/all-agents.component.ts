import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Subscription } from 'rxjs';
import { AgentModel } from 'src/app/core/models/agent.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { FilterOption } from 'src/app/core/interfaces/filter-option';
import { agentDataExport } from 'src/app/core/interfaces/agent.interface';

@Component({
  selector: 'app-all-agents',
  templateUrl: './all-agents.component.html',
  styleUrls: ['./all-agents.component.scss'],
})
export class AllAgentsComponent implements OnInit, OnDestroy {
  agentSubscription: Subscription;
  agents: AgentModel[] = [];
  loading: boolean = false;

  filteredAgents: AgentModel[] = [];

  filterOptions: FilterOption[];
  exportData: agentDataExport[] = [];
  exportFiltredData: agentDataExport[] = [];

  state: string[] = [];
  dataBirth: Date[] = [];
  created: Date[] = [];
  agentFullNames: string[] = [];
  email: string[] = [];
  city: string[] = [];
  role: string[] = [];
  zip: string[] = [];
  agentCode: number[] = [];

  orderField: string = 'agentCode';
  orderType: 'asc' | 'desc' = 'asc';

  page: number = 1;
  itemsPerPage: number = 15;

  get ROUTE_APP() {
    return ROUTE_APP;
  }

  constructor(
    private agentService: AgentService,
    private exporterService: ExporterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAgents();
  }
  ngOnDestroy(): void {
    this.agentSubscription?.unsubscribe();
  }

  loadAgents() {
    this.loading = true;
    this.agentSubscription = this.agentService
      .getAllAgents()
      .subscribe((resp) => {
        this.agents = resp.agents.filter((agent) => {
          return agent.active === true;
        });

        this.filteredAgents = this.agents;
        this.extractAllUniqueValues();
      });
  }

  deleteAgent(agent: AgentModel) {
    if (agent.uid === this.agentService.uid) {
      Swal.fire('Error!', "Can't delete this agent.", 'error');
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: `You want to eliminate Agent ${agent.firstName} ${agent.lastName}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.agentService.deleteAgent(agent).subscribe((res) => {
            this.loadAgents();
            Swal.fire('Deleted!', 'Agent has been removed.', 'success');
          });
        }
      });
    }
  }

  changeRole(agent: AgentModel) {
    this.agentService.updateAgent(agent).subscribe({
      next: (resp: any) => {
        Swal.fire({
          position: 'bottom-end',
          html: 'Agent Role updated.',
          showConfirmButton: false,
          timer: 1000,
        });
        this.loadAgents();
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
          title: 'Error',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }

  moreInfo(agent: AgentModel) {
    let formattedDateOfBirth: string = '';

    if (agent.dateBirth) {
      const dateOfBirth = agent.dateBirth;
      formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString('en-US');
    }

    Swal.fire({
      title: 'Info Agent',
      showCloseButton: true,
      html: `<div class="row">
            <div class="col-md-12 text-start">
              <table class="table table-hover">
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

  trackByAgentId(index: number, agent: AgentModel): string {
    return agent.uid;
  }

  editAgent(agent: AgentModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.ADMINISTRATOR}/${ROUTE_APP.ADD_AGENTS}/${agent.uid}`
    );
  }

  newAgent() {
    this.router.navigateByUrl(
      `${ROUTE_APP.ADMINISTRATOR}/${ROUTE_APP.ADD_AGENTS}/${TEXT.NEW}`
    );
  }

  filterAgents(value: string) {
    if (value) {
      this.filteredAgents = this.agents.filter((agent: AgentModel) => {
        return (
          agent.agentCode
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          agent.firstName.toLowerCase().includes(value.toLowerCase()) ||
          agent.lastName.toLowerCase().includes(value.toLowerCase()) ||
          agent.state?.toLowerCase().includes(value.toLowerCase()) ||
          agent.email.toLowerCase().includes(value.toLowerCase()) ||
          agent.city?.toLowerCase().includes(value.toLowerCase()) ||
          agent.zip?.toLowerCase().includes(value.toLowerCase()) ||
          agent.role?.toLowerCase().includes(value.toLowerCase()) ||
          agent.dateBirth?.toString().includes(value.toLowerCase())
        );
      });
    } else {
      this.filteredAgents = this.agents;
    }
  }

  sortAgentBy(field: string) {
    if (field === this.orderField) {
      this.orderType = this.orderType === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = field;
      this.orderType = 'asc';
    }

    this.filteredAgents.sort((a: any, b: any) => {
      if (
        (field === 'createdAt' || field === 'dateBirth') &&
        a[field] &&
        b[field]
      ) {
        const aValue = new Date(a[field]).toISOString();
        const bValue = new Date(b[field]).toISOString();

        return (
          aValue.localeCompare(bValue) * (this.orderType === 'asc' ? 1 : -1)
        );
      } else if (field === 'agentCode') {
        const aValue = a[field] || 0;
        const bValue = b[field] || 0;
        return (aValue - bValue) * (this.orderType === 'asc' ? 1 : -1);
      } else {
        const aValue = a[field] || '';
        const bValue = b[field] || '';

        return (
          aValue.toString().localeCompare(bValue.toString()) *
          (this.orderType === 'asc' ? 1 : -1)
        );
      }
    });
  }

  filterProspect(data: any[] = []) {
    this.filteredAgents = this.agents.filter((agent: AgentModel) => {
      const agentName = `${agent.firstName} ${agent.lastName}`;

      const createdAt = this.formatDateToYYYYMMDD(agent?.createdAt);
      const dateBirth = this.formatDateToYYYYMMDD(agent?.dateBirth);

      const filters = [
        // agent Code
        (agent: AgentModel) =>
          !data[0].value || agent.agentCode === Number(data[0].value),
        // agentName
        (agent: AgentModel) => !data[1].value || agentName === data[1].value,
        // dateBirth
        (agent: AgentModel) => !data[2].value || dateBirth === data[2].value,
        // State
        (agent: AgentModel) => !data[3].value || agent.state === data[3].value,
        (agent: AgentModel) => !data[4].value || agent.city === data[4].value,
        (agent: AgentModel) => !data[5].value || agent.role === data[5].value,
        (agent: AgentModel) => !data[6].value || createdAt === data[6].value,
      ];

      const passedFilters = filters.every((filter) => filter(agent));

      return passedFilters;
    });

    this.exportFiltredData = this.filteredAgents.map(this.extractAgentFields);
  }

  extractUniqueValues(fieldName: keyof AgentModel): any[] {
    return Array.from(
      new Set(this.filteredAgents.map((agent: AgentModel) => agent[fieldName]))
    );
  }

  extractAllUniqueValues() {
    this.city = this.extractUniqueValues('city');
    this.state = this.extractUniqueValues('state');
    this.role = this.extractUniqueValues('role');
    this.dataBirth = this.extractUniqueValues('dateBirth');
    this.created = this.extractUniqueValues('createdAt');
    this.createFiltres();
  }

  createFiltres() {
    this.filteredAgents = this.agents;
    this.exportData = this.agents.map(this.extractAgentFields);

    const createdAtFormatted = this.created.map((dateString) =>
      this.formatDateToYYYYMMDD(dateString)
    );

    const dateBirthFormatted = this.dataBirth.map((dateString) =>
      this.formatDateToYYYYMMDD(dateString)
    );

    this.agentFullNames = this.agents.map(
      (agent) => `${agent.firstName} ${agent.lastName}`
    );

    this.agentCode = this.agents.map((agent) => agent.agentCode);

    this.filterOptions = [
      {
        field: 'agentCode',
        label: 'Agent Code',
        options: this.agentCode,
        value: '',
      },
      {
        field: 'name',
        label: 'Name',
        options: this.agentFullNames,
        value: '',
      },
      {
        field: 'dataBirth',
        label: 'Data Birth',
        options: dateBirthFormatted,
        value: '',
      },
      {
        field: 'state',
        label: 'State',
        options: this.state,
        value: '',
      },
      {
        field: 'city',
        label: 'City',
        options: this.city,
        value: '',
      },
      {
        field: 'role',
        label: 'Role',
        options: this.role,
        value: '',
      },
      {
        field: 'createdAt',
        label: 'Created At',
        options: createdAtFormatted,
        value: '',
      },
    ];
    this.loading = false;
  }

  extractAgentFields(agent: AgentModel) {
    return {
      agentCode: agent.agentCode,
      firstName: agent.firstName,
      lastName: agent.lastName,
      city: agent.city,
      state: agent.state,
      zipCode: agent.zip,
      email: agent.email,
      dateBirth: agent.dateBirth,
      createdAt: agent.createdAt,
    };
  }

  formatDateToYYYYMMDD(dateString: Date | undefined) {
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return;
  }

  resetSelect() {
    this.createFiltres();
  }
}
