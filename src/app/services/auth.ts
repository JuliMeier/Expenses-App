import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/authResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'https://expensesappdemo-hhcwdbdrbmbhewah.brazilsouth-01.azurewebsites.net/api/auth/';

  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { 

    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserSubject.next('user');
    }
  }


  login(credentials: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + 'Login', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next('user');
      }
      )
    )

  }

  register(credentials: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + 'Register', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next('user');
      }
      )
    )
  }



  logout(): void {
   
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
