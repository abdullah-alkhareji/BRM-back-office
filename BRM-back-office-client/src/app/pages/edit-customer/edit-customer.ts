import { CustomersService } from './../../services/customers.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../../interfaces/customer';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-customer.html',
})
export class EditCustomer implements OnInit {
  title = 'Edit Customer';
  desc = 'Fill in the details to edit a customer';

  error = signal<string | null>(null);
  today = new Date().toISOString().split('T')[0];

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customersService = inject(CustomersService);

  customerNumber!: number;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('customerNumber'));

    if (!id) {
      this.error.set('Invalid customer id');
      this.router.navigate(['/']);
      return;
    }

    this.customerNumber = id;

    this.customersService.getCustomerById(id).subscribe({
      next: (customer) => {
        const dob = new Date(customer.dateOfBirth).toISOString().split('T')[0];

        this.form.patchValue({
          customerName: customer.customerName,
          dateOfBirth: dob,
          gender: customer.gender,
        });
      },
      error: () => {
        this.error.set('Customer not found');
        this.router.navigate(['/']);
      },
    });
  }

  form = this.fb.group({
    customerName: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  });

  onSubmit() {
    this.error.set(null);

    if (this.form.valid) {
      this.customersService.updateCustomer(this.customerNumber, this.form.value as any).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating customer', error);
          this.error.set('There was an error updating the customer. Please try again.');
        },
      });
    } else {
      console.log('Form is invalid');
      this.error.set('Please fill in all required fields correctly.');
    }
  }

  navigateToCustomers() {
    this.router.navigate(['/']);
  }
}
