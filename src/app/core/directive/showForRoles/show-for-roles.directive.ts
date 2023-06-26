import { AgentService } from './../../../services/agent/agent.service';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AgentModel } from '../../models/agent.model';

@Directive({
  selector: '[appShowForRoles]',
})
export class ShowForRolesDirective implements OnInit {
  @Input('appShowForRoles') allwoedRoles?: string[];

  private agent: AgentModel;
  private roles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    this.agent = this.agentService.agent;
    this.updateView();
  }

  @Input()
  set appShowForRoles(val: Array<string>) {
    this.roles = val;
    this.updateView();
  }

  private updateView() {
    this.viewContainerRef.clear();
    if (this.checkPermission()) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): boolean {
    let hasPermission = false;

    if (this.agent && this.agent.role) {
      for (let [index, rol] of this.roles.entries()) {
        if (this.agent?.role.toUpperCase() === rol) {
          hasPermission = true;
          return hasPermission;
          break;
        }
      }
    }
    return hasPermission;
  }
}
