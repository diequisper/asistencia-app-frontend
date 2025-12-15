import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private tokenKey = 'authToken';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<string> {
    const body = new HttpParams()
      .append('username', credentials.username)
      .append('password', credentials.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}/auth/login`, body, {
      headers,
      responseType: 'text'
    }).pipe(
      tap(token => {
        if (!token || token === 'Credenciales Inválidas') {
          throw new Error('Invalid credentials');
        }
        localStorage.setItem(this.tokenKey, token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
