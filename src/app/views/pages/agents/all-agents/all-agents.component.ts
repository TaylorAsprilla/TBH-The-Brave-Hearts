import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Subscription } from 'rxjs';
import { AgentModel } from 'src/app/core/models/agent.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';

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
  orderField: string = 'firstName';
  orderType: 'asc' | 'desc' = 'asc';

  get ROUTE_APP() {
    return ROUTE_APP;
  }

  constructor(private agentService: AgentService, private router: Router) {}

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
        this.loading = false;
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

  moreInfo(agent: AgentModel) {
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

  trackByAgentId(index: number, agent: AgentModel): string {
    return agent.uid;
  }

  editAgent(agent: AgentModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.AGENT}/${ROUTE_APP.ADD_AGENTS}/${agent.uid}`
    );
  }

  newAgent() {
    this.router.navigateByUrl(
      `${ROUTE_APP.AGENT}/${ROUTE_APP.ADD_AGENTS}/${TEXT.NEW}`
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
      if (a[field] < b[field]) {
        return this.orderType === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return this.orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
