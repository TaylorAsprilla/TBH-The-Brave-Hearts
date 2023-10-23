import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent/agent.service';
import Swal from 'sweetalert2';
import { customAlphabet } from 'nanoid';
import { StateModel } from 'src/app/core/models/state.model';
import { AgentModel } from 'src/app/core/models/agent.model';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';

@Component({
  selector: 'app-add-agents',
  templateUrl: './add-agents.component.html',
  styleUrls: ['./add-agents.component.scss'],
})
export class AddAgentsComponent implements OnInit {
  agentForm: UntypedFormGroup;
  states: StateModel[] = [];
  selectedAgent: AgentModel;

  isAgentFormSubmitted: Boolean;

  password: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    this.states = this.activatedRoute.snapshot.data['states'];

    this.activatedRoute.params.subscribe(({ id }) => {
      this.getAgentById(id);
    });

    this.createForm();
  }

  createForm() {
    const password = this.generatePassword();
    this.agentForm = this.formBuilder.group({
      agentCode: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(3)]],
      zip: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateBirth: ['', []],
      password: [
        { value: password, disabled: true },
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$/),
        ],
      ],
    });

    this.isAgentFormSubmitted = false;
  }

  get formAgent() {
    return this.agentForm.controls;
  }

  createAgent() {
    if (this.selectedAgent) {
      this.updateAgent();
    } else {
      this.isAgentFormSubmitted = true;

      const data = this.agentForm.value;
      data.password = this.formAgent.password.value;

      if (this.agentForm.valid) {
        this.agentService.createAgent(data).subscribe({
          next: (resp: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Agent created ',
              html: `<b> Agent Code: </b> ${resp.agent.agentCode}
            <p> ${resp.agent.firstName} ${resp.agent.lastName}</p>`,
            });
            this.resetForm();
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
              html: `${
                errorList.length ? errorList.join('') : error.error.msg
              }`,
            });
          },
        });
      }
    }
  }

  updateAgent() {
    const data: AgentModel = {
      ...this.formAgent.value,
      uid: this.selectedAgent.uid,
      agentCode: this.formAgent.agentCode.value,
      firstName: this.formAgent.firstName.value,
      lastName: this.formAgent.lastName.value,
      state: this.formAgent.state.value,
      email: this.formAgent.email.value,
      dateBirth: this.formAgent.dateBirth.value,
      imageUrl: this.selectedAgent.imageUrl,
    };

    this.agentService.updateAgent(data).subscribe({
      next: (resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated agent',
          html: `<b> Agent Code: </b> ${resp.agent.agentCode}
            <p> ${resp.agent.firstName} ${resp.agent.lastName}</p>`,
        });
        this.resetForm();
        this.router.navigateByUrl(`${ROUTE_APP.DASHBOARD}`);
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
          title: 'Error updating agent',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }

  getAgentById(id: string) {
    let formattedDateBirth: string;

    if (id !== TEXT.NEW) {
      this.password = false;
      this.agentService.getAgent(id).subscribe({
        next: (agent) => {
          const {
            agentCode,
            firstName,
            lastName,
            city,
            state,
            zip,
            email,
            dateBirth,
            password,
          } = agent;
          this.selectedAgent = agent;
          if (dateBirth) {
            formattedDateBirth = new Date(dateBirth)
              .toISOString()
              .split('T')[0];
          }

          this.agentForm.setValue({
            agentCode,
            firstName,
            lastName,
            city,
            state,
            zip,
            email,
            dateBirth: formattedDateBirth ? formattedDateBirth : '',
            password: '',
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
            title: 'Error updating agent',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });

          this.router.navigateByUrl(
            `${ROUTE_APP.AGENT}/${ROUTE_APP.ALL_AGENTS}`
          );
        },
      });
    }
  }

  generatePassword() {
    const alphabet =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generator = customAlphabet(alphabet, 8);
    const password = generator();
    return password;
  }

  resetForm() {
    this.agentForm.reset();
    this.createForm();
  }
}
