import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent/agent.service';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';
import { customAlphabet } from 'nanoid';

@Component({
  selector: 'app-add-agents',
  templateUrl: './add-agents.component.html',
  styleUrls: ['./add-agents.component.scss'],
})
export class AddAgentsComponent implements OnInit {
  agentForm: UntypedFormGroup;

  isAgentFormSubmitted: Boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
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
    this.isAgentFormSubmitted = true;
    const encryptedPassword = this.encryptPassword(
      this.formAgent.password.value
    );

    const data = this.agentForm.value;
    data.password = encryptedPassword;

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
          let errors = error?.error?.errors;
          let errorList: string[] = [];

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
  }

  generatePassword() {
    const alphabet =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generator = customAlphabet(alphabet, 8);
    const password = generator();
    return password;
  }

  encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
  }

  resetForm() {
    this.agentForm.reset();
    this.createForm();
  }
}
