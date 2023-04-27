import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  returnUrl: any;

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
        if (resp && resp.user) {
          if (data.remember) {
            localStorage.setItem('agentCode', data.agentCode);
          } else {
            localStorage.removeItem('agentCode');
          }

          localStorage.setItem('isLoggedin', 'true');
          if (localStorage.getItem('isLoggedin')) {
            this.router.navigate([this.returnUrl]);
          }

          Swal.fire({
            position: 'bottom-end',
            html: `Welcome ${resp.user.firstName} ${resp.user.lastName}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: (error: any) => {
        console.log('error', error);
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
          icon: 'error',
          title: 'Oops...',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`,
        });
      },
    });
  }
}
