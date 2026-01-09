import { ICustomer } from './../interfaces/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BaseService } from '../core/base.service';
import { catchError, map, Observable, throwError } from 'rxjs';
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
      map((customers: ICustomer[]) => {
        this.customers.set(customers);
        return customers;
      }),
      catchError((e) => {
        console.error('Error fetching customers', e);
        return throwError(() => e);
      })
    );
  }

  getCustomerById(id: number): Observable<ICustomer> {
    return this.get<ICustomer>(`${this.API}/${id}`).pipe(
      catchError((e) => {
        console.error(`Error fetching customer with id ${id}`, e);
        return throwError(() => e);
      })
    );
  }
}
