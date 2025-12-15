import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JustificacionService } from '../services/justificacion.service';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
  styleUrls: ['./justifications.component.css']
})
export class JustificationsComponent {
  solicitudForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private justificacionService: JustificacionService) {
    this.solicitudForm = this.fb.group({
      reason: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.solicitudForm.valid) {
      this.justificacionService.solicitar(this.solicitudForm.value).subscribe({
        next: () => this.message = 'Justification requested successfully!',
        error: (err) => this.message = 'Error requesting justification.'
      });
    }
  }
}
