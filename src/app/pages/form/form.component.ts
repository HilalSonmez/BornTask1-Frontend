import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router,RouterLink} from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatDatepickerModule,
  MatNativeDateModule,RouterLink],  
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  text1 = '';
  num1 = 0;
  date1 = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  saveForm() {
    if (!this.text1 || !this.date1) {
      this.snackBar.open('Lütfen boş alan bırakmayınız.', 'Kapat', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });

      return;
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = {
      text1: this.text1,
      num1: this.num1,
      date1: this.date1,
    };

    this.http
      .post(`${environment.apiUrl}/Form/save-form`, formData, {
        headers: headers,
      })
      .subscribe({
        next: (response: any) => {
  this.snackBar.open(response.message, "Kapat", {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });

  this.text1 = '';
  this.num1 = 0;
  this.date1 = '';
},
        error: (error) => {
          console.log(error);
          let message = 'Form kaydedilemedi';

          if (typeof error.error === 'string') {
            message = error.error;
          }

          if (error.error?.message) {
            message = error.error.message;
          }

          if (error.error?.errors) {
            const errors = error.error.errors;
            const firstKey = Object.keys(errors)[0];
            message = errors[firstKey][0];
          }
          this.snackBar.open(message, 'Kapat', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
      });
  }
  logout() {
    localStorage.removeItem('token');

    this.snackBar.open('Başarıyla çıkış yapıldı', 'Kapat', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    this.router.navigate(['/login']);
  }
}
