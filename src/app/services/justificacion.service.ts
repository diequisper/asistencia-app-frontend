import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JustificacionService {
  private apiUrl = 'http://localhost:8080/api/justificacion';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  solicitar(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitud`, request, { headers: this.getHeaders() });
  }

  aprobar(request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/aprobacion`, request, { headers: this.getHeaders() });
  }
}