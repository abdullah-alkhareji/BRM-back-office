import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-add-customer',
  imports: [ReactiveFormsModule],
  templateUrl: './add-customer.html',
})
export class AddCustomer {
  title = 'Add Customer';
  desc = 'Fill in the details to add a new customer';

  error = signal<string | null>(null);
  today = new Date().toISOString().split('T')[0];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private customersService = inject(CustomersService);

  form = this.fb.group({
    customerName: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  });

  onSubmit() {
    this.error.set(null);

    if (this.form.valid) {
      this.customersService.createCustomer(this.form.value as any).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating customer', error);
          this.error.set('There was an error creating the customer. Please try again.');
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
