import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getByUsername(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http.get(`${this.apiUrl}/by-username`, { params });
  }

  getById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.apiUrl}/by-id`, { params });
  }
}