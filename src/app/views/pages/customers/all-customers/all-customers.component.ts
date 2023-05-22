import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTable } from 'simple-datatables';
import { ROUTE_APP } from 'src/app/core/enum/router-app.enum';
import { TEXT } from 'src/app/core/enum/text.enum';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss'],
})
export class AllCustomersComponent implements OnInit, OnDestroy, AfterViewInit {
  customerSubscription: Subscription;
  customers: CustomerModel[] = [];
  dataTableCustomers: any;
  loading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
    this.dataTableCustomers?.destroy();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.initializeTable();
  }

  loadCustomers() {
    this.loading = true;
    this.customerSubscription = this.customerService
      .getAllCustomers()
      .subscribe((resp) => {
        this.customers = resp.customers;
        this.loading = false;
      });
  }

  initializeTable() {
    const options = { searchable: true, fixedHeight: true };
    const tableElement = document.getElementById('dataTableCustomers');

    if (tableElement) {
      this.dataTableCustomers = new DataTable(tableElement, options);
    }
  }

  trackByCustomerId(index: number, customer: CustomerModel): string {
    return customer.uid;
  }

  editCustomer(customer: CustomerModel) {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.EDIT_CUSTOMERS}/${customer.uid}`
    );
  }
  deleteCustomer(customer: CustomerModel) {}

  newCustomer() {
    this.router.navigateByUrl(
      `${ROUTE_APP.CUSTOMER}/${ROUTE_APP.ADD_CUSTOMERS}/${TEXT.NEW}`
    );
  }
}
