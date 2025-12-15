import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any[] = [];

  constructor(private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.asistenciaService.getHistorial().subscribe({
      next: (data) => this.history = data,
      error: (err) => console.error('Error loading history', err)
    });
  }
}
