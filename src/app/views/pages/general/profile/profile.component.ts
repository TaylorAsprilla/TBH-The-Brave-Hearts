import { Component, OnInit } from '@angular/core';
import { AgentModel } from 'src/app/core/models/agent.model';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ChangePadswordInterface } from 'src/app/core/interfaces/agent.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  changePasswordForm: UntypedFormGroup;

  isChangePasswordFormFormSubmitted: Boolean;

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

  constructor(
    private agentService: AgentService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.agent = this.agentService.agent;
    this.agentInformation();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.imageSubscription?.unsubscribe();
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

  createForm() {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(5)]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$/),
          ],
        ],
        newPasswordTwo: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$/),
          ],
        ],
      },
      {
        validators: this.samePasswords('newPassword', 'newPasswordTwo'),
      }
    );

    this.isChangePasswordFormFormSubmitted = false;
  }

  get formChangePassword() {
    return this.changePasswordForm.controls;
  }

  changeImage() {
    this.showModal = true;
  }

  actualizarImagen($event: any) {
    this.agentInformation();
  }

  async updateEmail() {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
      showCancelButton: true,
      allowOutsideClick: false,
    });

    if (email) {
      const updatedAgent: AgentModel = {
        ...this.agent,
        imageUrl: this.agent.imageUrl,
        email: email,
      };
      this.agentService.updateAgent(updatedAgent).subscribe({
        next: (res: any) => {
          this.agent.email = email;
          this.agentInformation();
          Swal.fire(`Entered email: ${email}`);
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
  }

  changePassword() {
    this.isChangePasswordFormFormSubmitted = true;
    const data = this.changePasswordForm.value;
    const dataChangePassword: ChangePadswordInterface = {
      ...data,
      agentCode: this.agentCode,
    };

    if (this.changePasswordForm.valid) {
      this.agentService.changePassword(dataChangePassword).subscribe({
        next: (res: any) => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'password changed',
            showConfirmButton: false,
            timer: 1500,
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
            title: 'Error change password',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`,
          });
        },
      });
    }
  }

  invalidPassword() {
    const password = this.formChangePassword.newPassword;
    const passwordTwo = this.formChangePassword.newPasswordTwo;

    if (
      password.value !== passwordTwo.value &&
      this.isChangePasswordFormFormSubmitted
    ) {
      return true;
    } else {
      return false;
    }
  }

  samePasswords(newPassword: string, newPasswordTwo: string) {
    return (formGroup: UntypedFormGroup) => {
      const passControl = formGroup.get(newPassword);
      const passControlTwo = formGroup.get(newPasswordTwo);

      if (passControl?.value === passControlTwo?.value) {
        passControlTwo?.setErrors(null);
      } else {
        passControlTwo?.setErrors({ noEsIgual: true });
      }
    };
  }
}
