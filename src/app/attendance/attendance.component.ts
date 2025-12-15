import { Component } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  message: string = '';

  constructor(private asistenciaService: AsistenciaService) { }

  checkin(): void {
    const request = { /* add necessary fields */ };
    this.asistenciaService.checkin(request).subscribe({
      next: () => this.message = 'Checked in successfully!',
      error: (err) => this.message = 'Error checking in.'
    });
  }

  checkout(): void {
    const request = { /* add necessary fields */ };
    this.asistenciaService.checkout(request).subscribe({
      next: () => this.message = 'Checked out successfully!',
      error: (err) => this.message = 'Error checking out.'
    });
  }
}
