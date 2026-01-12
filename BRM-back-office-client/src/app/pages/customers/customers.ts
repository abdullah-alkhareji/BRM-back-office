import { DatePipe } from '@angular/common';
import { CustomersService } from './../../services/customers.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [DatePipe],
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  title = 'Customers';
  desc = 'List of customers';
  private customersService = inject(CustomersService);
  private router = inject(Router);

  customers = this.customersService.customers;

  ngOnInit() {
    if (this.customers().length === 0) {
      this.customersService.getAllCustomers().subscribe();
    }
  }

  navigateToAddCustomer() {
    this.router.navigate(['/add-customer']);
  }

  navigateToEditCustomer(customerNumber: number) {
    this.router.navigate([`/edit-customer/${customerNumber}`]);
  }

  deleteCustomer(customerNumber: number) {
    this.customersService.deleteCustomer(customerNumber).subscribe({
      next: () => {
        console.log(`Customer ${customerNumber} deleted successfully`);
      },
      error: (error) => {
        console.error(`Error deleting customer ${customerNumber}`, error);
      },
    });
  }
}
