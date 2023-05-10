import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Subscription } from 'rxjs';
import { AgentModel } from 'src/app/core/models/agent.model';

@Component({
  selector: 'app-all-agents',
  templateUrl: './all-agents.component.html',
  styleUrls: ['./all-agents.component.scss'],
})
export class AllAgentsComponent implements OnInit, OnDestroy, AfterViewInit {
  agentSubscription: Subscription;
  agents: AgentModel[] = [];
  dataTableAgents: any;
  loading: boolean = false;

  constructor(private agentService: AgentService) {}

  ngOnDestroy(): void {
    this.agentSubscription?.unsubscribe();
    this.dataTableAgents?.destroy();
  }

  ngOnInit(): void {
    this.loadAgents();
  }

  ngAfterViewInit() {
    this.initializeTable();
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

  initializeTable() {
    const options = { searchable: true, fixedHeight: true };
    const tableElement = document.getElementById('dataTableAgents');

    if (tableElement) {
      this.dataTableAgents = new DataTable(tableElement, options);
    }
  }
}
