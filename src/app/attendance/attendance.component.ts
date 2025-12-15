
import { Component } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';
import { UsuarioService } from '../services/usuario.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  message: string = '';

  constructor(
    private asistenciaService: AsistenciaService,
    private usuarioService: UsuarioService
  ) {}

  private getUsername(): string {
    const token = localStorage.getItem('authToken');
    if (!token) return '';
    const decoded: any = jwtDecode(token);
    console.log('JWT decoded payload:', decoded);
    return decoded.sub || '';
  }

  checkin(): void {
    const username = this.getUsername();
    if (!username) {
      this.message = 'No user found in token';
      return;
    }

    this.usuarioService.getByUsername(username).subscribe({
      next: (usuario) => {
        const request = {
          usuario: usuario.id,
          entrada: new Date().toISOString(),
          salida: new Date().toISOString()
        };
        this.asistenciaService.checkin(request).subscribe({
          next: () => this.message = 'Checked in successfully!',
          error: (err) => {
            console.error('Check-in error:', err);
            this.message = 'Error checking in.';
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user by username', err);
        this.message = 'Could not retrieve user ID.';
      }
    });
  }

  checkout(): void {
    const username = this.getUsername();
    if (!username) {
      this.message = 'No user found in token';
      return;
    }

    this.usuarioService.getByUsername(username).subscribe({
      next: (usuario) => {
        const request = {
          usuario: usuario.id,
          entrada: new Date().toISOString(),
          salida: new Date().toISOString()
        };
        this.asistenciaService.checkout(request).subscribe({
          next: () => this.message = 'Checked out successfully!',
          error: (err) => {
            console.error('Check-out error:', err);
            this.message = 'Error checking out.';
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user by username', err);
        this.message = 'Could not retrieve user ID.';
      }
    });
  }
}


