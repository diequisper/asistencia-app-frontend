import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = 'http://localhost:8080/api/asistencia';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  checkin(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkin`, request, { headers: this.getHeaders() });
  }

  checkout(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, request, { headers: this.getHeaders() });
  }

  getHistorial(): Observable<any> {
    return this.http.get(`${this.apiUrl}/historial`, { headers: this.getHeaders() });
  }
}
