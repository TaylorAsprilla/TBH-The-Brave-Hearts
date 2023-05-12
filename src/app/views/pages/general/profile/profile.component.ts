import { Component, OnInit } from '@angular/core';
import { AgentModel } from 'src/app/core/models/agent.model';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imageProfile: string;
  email: string;
  firstName: string;
  lastName: string;
  agentCode: number;
  state: string;
  city: string;
  role: string;
  showModal: boolean = false;

  agent: AgentModel;

  imageSubscription: Subscription;

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agent = this.agentService.agent;
    this.agentInformation();
  }

  agentInformation() {
    const agent = this.agentService.agent;

    this.imageProfile = agent.imageUrl;
    this.firstName = agent.firstName;
    this.lastName = agent.lastName;
    this.email = agent.email;
    this.agentCode = agent.agentCode;
    this.state = agent.state;
    this.city = agent.city ? agent.city : '';
    this.role = agent.role ? agent.role : '';
  }

  changeImage() {
    this.showModal = true;
  }

  actualizarImagen($event: any) {
    this.agentInformation();
  }
}
