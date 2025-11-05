import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'https://localhost:7037/api/Transactions'

  constructor(private http: HttpClient) { }

  getAll() : Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl +'/all');
  }

  getById(id: number) : Observable<Transaction> {
    return this.http.get<Transaction>(this.apiUrl +`/details/${id}`);
  }

  create(transaction: Transaction) : Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl +'/create', transaction);
  }
  
  update(id: number, transaction: Transaction) : Observable<Transaction> {
    return this.http.put<Transaction>(this.apiUrl +`/update/${id}`, transaction);
  }

  delete(id: number) : Observable<void> {
    return this.http.delete<void>(this.apiUrl +`/delete/${id}`);
  }
} 