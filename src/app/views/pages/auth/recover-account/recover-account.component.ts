import { AgentService } from 'src/app/services/agent/agent.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss'],
})
export class RecoverAccountComponent implements OnInit {
  accountForm: FormGroup;

  get ROUTE_APP() {
    return ROUTE_APP;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      agentCode: [
        localStorage.getItem('agentCode') || '',
        [Validators.required],
      ],
    });
  }

  recoverAccount() {
    const agentCode = this.accountForm.value;
    this.agentService.forgotPassword(agentCode).subscribe((respuesta: any) => {
      Swal.fire({
        title: 'Recover Account',
        icon: 'warning',
        html: `${respuesta.msg}`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl(`${ROUTE_APP.AUTH_LOGIN}`);
        }
      });
    });
  }
}
