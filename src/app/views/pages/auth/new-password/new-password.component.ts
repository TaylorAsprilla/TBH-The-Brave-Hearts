import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { AgentService } from 'src/app/services/agent/agent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  formSubmitted: boolean = false;
  token: string = '';

  showPassword: boolean = false;

  get ROUTE_APP() {
    return ROUTE_APP;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private agentService: AgentService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ token }) => {
      this.token = token;
    });

    this.passwordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$/),
          ],
        ],
        passwordTwo: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).+$/),
          ],
        ],
      },
      {
        validators: this.samePasswords('password', 'passwordTwo'),
      }
    );
  }

  get formChangePassword() {
    return this.passwordForm.controls;
  }

  passwordInvalid(): boolean {
    const passwordUno = this.passwordForm.controls['password'];
    const passwordTwo = this.passwordForm.controls['passwordTwo'];

    if (
      passwordUno.value !== passwordTwo.value &&
      this.formSubmitted &&
      !this.passwordForm.valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  samePasswords(password: string, passwordTwo: string) {
    return (formGroup: UntypedFormGroup) => {
      const passControl = formGroup.get(password);
      const passControlTwo = formGroup.get(passwordTwo);

      if (passControl?.value === passControlTwo?.value) {
        passControlTwo?.setErrors(null);
      } else {
        passControlTwo?.setErrors({ noEsIgual: true });
      }
    };
  }

  changePassword() {
    this.formSubmitted = true;
    const passwordOne = this.passwordForm.controls['password'];

    if (this.passwordForm.valid) {
      this.agentService
        .createNewPassword(passwordOne.value, this.token)
        .subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Change Password',
              icon: 'warning',
              html: resp.msg,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl(`${ROUTE_APP.AUTH_LOGIN}`);
              }
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
              title: 'Error change Password',
              icon: 'error',
              html: `${
                errorList.length ? errorList.join('') : error.error.msg
              }`,
            });
          },
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
