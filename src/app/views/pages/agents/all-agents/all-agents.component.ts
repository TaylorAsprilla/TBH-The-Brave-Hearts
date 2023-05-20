import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
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
export class AllAgentsComponent implements OnInit, OnDestroy, AfterViewInit {
  agentSubscription: Subscription;
  agents: AgentModel[] = [];
  // dataTableAgents: any;
  loading: boolean = false;

  get ROUTE_APP() {
    return ROUTE_APP;
  }

  constructor(private agentService: AgentService, private router: Router) {}

  ngOnDestroy(): void {
    this.agentSubscription?.unsubscribe();
    // this.dataTableAgents?.destroy();
  }

  ngOnInit(): void {
    this.loadAgents();
    // const dataTable = new DataTable('#dataTableAgentsDos');
  }

  ngAfterViewInit() {
    // this.initializeTable();
  }

  // initializeTable() {
  //   const options = { searchable: true, fixedHeight: true };
  //   const tableElement = document.getElementById('dataTableAgents');

  //   if (tableElement) {
  //     this.dataTableAgents = new DataTable(tableElement, options);
  //   }
  // }

  loadAgents() {
    this.loading = true;
    this.agentSubscription = this.agentService
      .getAllAgents()
      .subscribe((resp) => {
        this.agents = resp.agents.filter((agent) => {
          return agent.active === true;
        });
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
}
