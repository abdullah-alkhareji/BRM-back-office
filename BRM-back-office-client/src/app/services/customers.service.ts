import { ICustomer } from './../interfaces/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BaseService } from '../core/base.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends BaseService {
  private readonly API = `${environment.apiBaseUrl}/customer`;

  constructor(http: HttpClient) {
    super(http);
  }

  customers = signal<ICustomer[]>([]);

  getAllCustomers(): Observable<ICustomer[]> {
    return this.get<ICustomer[]>(`${this.API}/`).pipe(
      tap((customers) => this.customers.set(customers)),
      catchError((e) => {
        console.error('Error fetching customers', e);
        return throwError(() => e);
      })
    );
  }

  getCustomerById(customerNumber: number): Observable<ICustomer> {
    return this.get<ICustomer>(`${this.API}/${customerNumber}`).pipe(
      catchError((e) => {
        console.error(`Error fetching customer ${customerNumber}`, e);
        return throwError(() => e);
      })
    );
  }

  createCustomer(payload: Omit<ICustomer, 'customerNumber'>): Observable<ICustomer> {
    return this.post<ICustomer, any>(`${this.API}`, payload).pipe(
      tap((created) => {
        this.customers.update((list) => [...list, created]);
      }),
      catchError((e) => {
        console.error('Error creating customer', e);
        return throwError(() => e);
      })
    );
  }

  updateCustomer(
    customerNumber: number,
    payload: Omit<ICustomer, 'customerNumber'>
  ): Observable<void> {
    return this.put<void, any>(`${this.API}/${customerNumber}`, payload).pipe(
      tap(() => {
        this.customers.update((list) =>
          list.map((c) => (c.customerNumber === customerNumber ? { ...c, ...payload } : c))
        );
      }),
      catchError((e) => {
        console.error(`Error updating customer ${customerNumber}`, e);
        return throwError(() => e);
      })
    );
  }

  deleteCustomer(customerNumber: number): Observable<void> {
    return this.delete<void>(`${this.API}/${customerNumber}`).pipe(
      tap(() => {
        this.customers.update((list) => list.filter((c) => c.customerNumber !== customerNumber));
      }),
      catchError((e) => {
        console.error(`Error deleting customer ${customerNumber}`, e);
        return throwError(() => e);
      })
    );
  }
}
