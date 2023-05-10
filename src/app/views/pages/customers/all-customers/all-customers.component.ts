import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTable } from 'simple-datatables';
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

  constructor(private customerService: CustomerService) {}

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
        console.log(resp);
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
}
