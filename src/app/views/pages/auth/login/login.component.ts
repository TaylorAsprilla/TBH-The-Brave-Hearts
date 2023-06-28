import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { AgentService } from 'src/app/services/agent/agent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  isLoginFormSubmitted: Boolean;
  showPassword: boolean = false;

  returnUrl: any;

  get ROUTE_APP() {
    return ROUTE_APP;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      agentCode: [
        localStorage.getItem('agentCode') || '',
        [Validators.required, Validators.minLength(3)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [localStorage.getItem('agentCode') || '', []],
    });

    this.isLoginFormSubmitted = false;
  }

  get formLogin() {
    return this.loginForm.controls;
  }

  login() {
    this.isLoginFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    this.agentService.login(data).subscribe({
      next: (resp: any) => {
        if (resp && resp.agent) {
          const { firstName, lastName } = resp.agent;
          const { remember } = data;

          if (remember) {
            localStorage.setItem('agentCode', data.agentCode);
          } else {
            localStorage.removeItem('agentCode');
          }

          Swal.fire({
            position: 'bottom-end',
            html: `Welcome ${firstName} ${lastName}`,
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            this.router.navigate([this.returnUrl]);
          });
        }
      },
      error: (error: any) => {
        let errors = error?.error?.errors;
        let errorList: string[] = [];

        if (errors) {
          errorList = Object.values(errors)
            .map((value: any) => value?.msg)
            .filter((msg: any) => msg);
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: `${
            errorList.length ? errorList.join('<br>') : error.error.msg
          }`,
        });
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
