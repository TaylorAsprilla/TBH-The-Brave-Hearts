import { Component, OnInit } from '@angular/core';
import { AgentModel } from 'src/app/core/models/agent.model';
import { AgentService } from 'src/app/services/agent/agent.service';
import { FileUploadService } from 'src/app/services/fileUpload/file-upload.service';

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

  agent: AgentModel;

  constructor(
    private agentService: AgentService,
    private fileUploadService: FileUploadService
  ) {}

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
}
